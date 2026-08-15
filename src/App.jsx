import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import OnboardingStartScreen from './components/OnboardingStartScreen';
import OnboardingQuiz from './components/OnboardingQuiz';
import OnboardingResult from './components/OnboardingResult';
import DailyDashboard from './components/DailyDashboard';
import WeeklyCheckin from './components/WeeklyCheckin';
import WorkoutProgram from './components/WorkoutProgram';
import NutritionPlan from './components/NutritionPlan';
import KnowledgeBase from './components/KnowledgeBase';
import Matrix90DaysModal from './components/Matrix90DaysModal';
import StrikeSaveModal from './components/StrikeSaveModal';
import PaywallModal from './components/PaywallModal';
import AdminPanelModal from './components/AdminPanelModal';
import { StorageManager } from './utils/storage';

export default function App() {
  const [profile, setProfile] = useState(() => StorageManager.getUserProfile());
  const [showQuiz, setShowQuiz] = useState(false);
  const [pendingProfile, setPendingProfile] = useState(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [isStrikeSaveOpen, setIsStrikeSaveOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [streakState, setStreakState] = useState(() => StorageManager.getStreakState());

  useEffect(() => {
    StorageManager.updateStreak();
    setStreakState(StorageManager.getStreakState());
  }, []);

  const handleStartOnboarding = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (quizData) => {
    setPendingProfile(quizData);
  };

  const handleStartChallenge = () => {
    const saved = StorageManager.saveUserProfile(pendingProfile);
    setProfile(saved);
    setPendingProfile(null);
    setShowQuiz(false);
    setActiveTab('dashboard');
  };

  const handleResetProfile = () => {
    if (window.confirm('Сбросить данные и запустить онбординг заново?')) {
      StorageManager.resetAll();
      setProfile(null);
      setPendingProfile(null);
      setShowQuiz(false);
      setStreakState(StorageManager.getStreakState());
    }
  };

  // 1. Initial Start Screen (Concept Screen 1)
  if (!profile && !showQuiz && !pendingProfile) {
    return <OnboardingStartScreen onStart={handleStartOnboarding} />;
  }

  // 2. Onboarding Quiz Steps
  if (!profile && showQuiz && !pendingProfile) {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  // 3. Calculated Results & 3-Day Free Trial Screen
  if (!profile && pendingProfile) {
    return <OnboardingResult profile={pendingProfile} onStartChallenge={handleStartChallenge} />;
  }

  // 4. Main Application
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Top Header */}
      <Header
        profile={profile}
        streakState={streakState}
        onOpenMatrix={() => setIsMatrixOpen(true)}
        onOpenPaywall={() => setIsPaywallOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Tab View with Smooth Scroll */}
      <main style={{
        flex: 1,
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        paddingBottom: 'calc(88px + env(safe-area-inset-bottom, 0px))'
      }}>
        {activeTab === 'dashboard' && (
          <DailyDashboard
            profile={profile}
            streakState={streakState}
            setStreakState={setStreakState}
            onOpenMatrix={() => setIsMatrixOpen(true)}
            onOpenWeekly={() => setActiveTab('weekly')}
            onOpenWorkout={() => setActiveTab('workout')}
            onOpenNutrition={() => setActiveTab('nutrition')}
            onOpenStrikeSave={() => setIsStrikeSaveOpen(true)}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutProgram
            profile={profile}
            onCompleteSession={() => {
              const logs = StorageManager.getDailyLogs();
              const day = streakState.dayNumber || 1;
              const cur = logs[day] || {};
              StorageManager.saveDailyLog(day, { ...cur, workout: true });
            }}
          />
        )}

        {activeTab === 'weekly' && (
          <WeeklyCheckin
            profile={profile}
            onUpdateProfile={(updated) => setProfile(updated)}
            onClose={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'nutrition' && (
          <NutritionPlan profile={profile} />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBase />
        )}
      </main>

      {/* Bottom Floating Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <Matrix90DaysModal
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        currentDay={streakState.dayNumber || 1}
        onSelectDay={(dayNum) => {
          setStreakState(prev => ({ ...prev, dayNumber: dayNum }));
        }}
      />

      <StrikeSaveModal
        isOpen={isStrikeSaveOpen}
        onClose={() => setIsStrikeSaveOpen(false)}
        streakState={streakState}
        setStreakState={setStreakState}
      />

      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        profile={profile}
        streakState={streakState}
        setStreakState={setStreakState}
        onLogout={handleResetProfile}
      />
    </div>
  );
}

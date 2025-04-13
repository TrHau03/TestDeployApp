'use client';

import { useUser } from '@/client/auth';
import { useEffect, useState } from 'react';
import LoginStreakPopup from './login-streak-popup';
import { useLoginStreak } from './use-login-streak';

const LoginStreakComponent = () => {
  const user = useUser();
  const { streakData, refreshLoginStreak, loading } = useLoginStreak();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user?._tag === 'AUTHENTICATED' && streakData && !streakData.is_claimed_today) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [user, streakData, loading]);

  if (!user || user._tag !== 'AUTHENTICATED' || !streakData) return null;

  return (
    <>
      {showPopup && (
        <LoginStreakPopup
          streakData={streakData}
          onClose={() => setShowPopup(false)}
          refreshLoginStreak={refreshLoginStreak}
        />
      )}
    </>
  );
};

export default LoginStreakComponent;

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StreakData, claimStreakReward } from "./use-login-streak";

interface Props {
  streakData: StreakData;
  onClose: () => void;
  refreshLoginStreak: () => Promise<void>;
}

function getTodayUTCDateString() {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getTodayUTCIndex(): number {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getUTCDay();
}

const LoginStreakPopup: React.FC<Props> = ({ streakData, onClose, refreshLoginStreak }) => {
  const todayIndex = getTodayUTCIndex();
  const [claimed, setClaimed] = useState<boolean | null>(null);
  const [weeklyStatus, setWeeklyStatus] = useState(streakData.streak.weekly_streak);

  useEffect(() => {
    setClaimed(streakData.is_claimed_today ?? false);
    setWeeklyStatus(streakData.streak.weekly_streak);
  }, [streakData]);

  const handleClaim = async () => {
    if (claimed) return;

    const success = await claimStreakReward();
    if (success) {
      localStorage.setItem("lastClaimedDate", getTodayUTCDateString());
      setClaimed(true);
      setWeeklyStatus((prevStatus) => {
        const updated = [...prevStatus];
        updated[todayIndex] = {
          ...updated[todayIndex],
          status: true,
        };
        return updated;
      });
      await refreshLoginStreak();
    }
  };

  if (claimed === null) {
    return (
      <div className="absolute left-1/2 top-0 mt-4 transform -translate-x-1/2 bg-[#1A1A1A] text-white rounded-3xl max-w-2xl p-8 w-[95vw] sm:w-[650px] md:w-[600px] shadow-xl border border-gray-700 z-50 text-center">
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-0 mt-4 transform -translate-x-1/2 
  bg-[#1A1A1A] text-white rounded-3xl 
  w-full max-w-[85vw] sm:max-w-[600px] md:max-w-[660px] 
  px-6 py-6 shadow-xl border border-gray-700 z-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{streakData.streak.current} Day Streak</h2>
        <p className="text-lg font-medium text-white">Diamonds: {streakData.total_diamonds} 💎</p>
      </div>

      <div className="flex justify-center gap-6 py-6">
        {weeklyStatus.map((item, index) => {
          const status = item.status;
          const isToday = index === todayIndex;
          const isClaimed = isToday ? claimed : status === true;
          const isTodayNotClaimed = isToday && !claimed;
          const isTodayClaimed = isToday && claimed;

          const borderClass = isClaimed
            ? "border-[#85F612]"
            : isTodayNotClaimed
            ? "border-blue-400"
            : "border-gray-500";
          const bgClass = isClaimed
            ? "bg-[#4DA10B]"
            : isTodayNotClaimed
            ? "bg-blue-800"
            : "bg-gray-700";
          const extraBorder =
            isTodayNotClaimed || isTodayClaimed ? "border-4 border-yellow-400" : "border-2";
          const tooltipText = isToday ? (isClaimed ? "Just claimed!" : "Today") : "";

          return (
            <div key={index} className="flex flex-col items-center relative group">
              <p className={`text-sm font-medium ${isClaimed ? "text-white" : "text-gray-400"}`}>
                {item.title.toUpperCase()}
              </p>

              <motion.div
                className={`w-16 h-16 flex items-center justify-center rounded-full transition-all ${bgClass} ${borderClass} ${extraBorder}`}
                initial={false}
                animate={isToday && isClaimed ? { scale: [1, 1.3, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.8 }}
              >
                <motion.svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  initial={false}
                  animate={isToday && isClaimed ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill={isClaimed ? "#85F612" : isTodayNotClaimed ? "#0066CC" : "#B0B0B0"}
                  />
                  <g transform="scale(0.6) translate(8 8)">
                    <path d="M2 8L6 3H18L22 8L12 21L2 8Z" stroke="white" strokeWidth="2" />
                  </g>
                </motion.svg>
              </motion.div>

              {isToday && tooltipText && (
                <div className="absolute -top-6 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition">
                  {tooltipText}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        className={`w-full p-4 text-white rounded-xl transition-all font-semibold text-lg ${
          claimed ? "bg-gray-700 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 active:scale-95"
        }`}
        onClick={handleClaim}
        disabled={claimed}
      >
        {claimed ? "Claimed" : "CLAIM"}
      </button>

      <button
        className="w-full mt-4 p-4 text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all active:scale-95 text-lg"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default LoginStreakPopup;

"use client";

import { useEffect, useState } from "react";
import { useLoginStreak } from "./use-login-streak";
import LoginStreakPopup from "./login-streak-popup";
import IconAward from "@/components/icon/icon-award";
import { useUser } from "@/client/auth";

const LoginStreakIcon = () => {
  const user = useUser();
  const [showPopup, setShowPopup] = useState(false);

  const { streakData, refreshLoginStreak, loading } = useLoginStreak();

  if (!user || user._tag !== "AUTHENTICATED") return null;

  return (
    <div className="flex items-center ml-2">
      <button
        onClick={() => {
          if (!loading) setShowPopup(true);
        }}
        className="flex items-center space-x-1 p-2"
        title="Reward"
        disabled={loading}
      >
        <IconAward
          className={`w-5 h-5 transition-opacity duration-300 ${
            loading
              ? "opacity-40 cursor-not-allowed"
              : "hover:opacity-80 text-[rgb(133,246,18)]"
          }`}
        />
        <span
          className={`text-white text-sm font-medium ${
            loading ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          Reward
        </span>
      </button>
  
      {showPopup && streakData && (
        <LoginStreakPopup
          streakData={streakData}
          onClose={() => setShowPopup(false)}
          refreshLoginStreak={refreshLoginStreak}
        />
      )}
    </div>
  );    
};

export default LoginStreakIcon;

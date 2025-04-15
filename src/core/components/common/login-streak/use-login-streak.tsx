"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/client/auth"; 

interface WeeklyStreakItem {
  title: string;
  status: boolean | null;
}

interface Streak {
  current: number;
  highest: number;
  last_login: string;
  is_new_login_for_today: boolean;
  weekly_streak: WeeklyStreakItem[];
}

export interface StreakData {
  streak: Streak;
  total_diamonds: number;
  is_claimed_today?: boolean;
}

export const useLoginStreak = () => {
  const user = useUser(); 

  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreakData = async () => {
    if (!user || user._tag !== "AUTHENTICATED") return; 

    setLoading(true);
    setError(null);

    try {
      const streakRes = await fetch("/api/users/streak");
      const streakJson = await streakRes.json();

      if (!streakJson._metadata.success) {
        throw new Error("Failed to fetch streak");
      }

      const streak = streakJson.result.streak;

      const rewardRes = await fetch("/api/users/rewards");
      const rewardJson = await rewardRes.json();

      if (!rewardJson._metadata.success) {
        throw new Error("Failed to fetch reward");
      }

      const { total_diamonds, is_claimed_today } = rewardJson.result;

      const fullData: StreakData = {
        streak,
        total_diamonds,
        is_claimed_today: is_claimed_today ?? false,
      };

      setStreakData(fullData);
    } catch (err: any) {
      console.error("useLoginStreak error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._tag === "AUTHENTICATED") {
      fetchStreakData();
    }  }, [user?._tag]);

  return {
    streakData,
    loading,
    error,
    refreshLoginStreak: fetchStreakData,
  };
};

export const claimStreakReward = async (): Promise<boolean> => {
  try {
    const res = await fetch("/api/users/rewards", { method: "PUT" });
    const json = await res.json();
    return json._metadata.success === true;
  } catch (err) {
    console.error("Failed to claim streak reward:", err);
    return false;
  }
};


import { fetchLoginStreak } from "@/server/auth/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetchLoginStreak();

    return NextResponse.json(
      {
        _metadata: { success: true },
        result: response.result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetch streak:", error);
    return NextResponse.json(
      {
        _metadata: { success: false },
        result: {
          streak: {
            current: 0,
            highest: 0,
            last_login: "",
            is_new_login_for_today: false,
            weekly_streak: [],
          },
          is_claimed_today: false,
          total_diamonds: 0,
        },
      },
      { status: 500 }
    );
  }
}
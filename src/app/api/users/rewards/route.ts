import { claimUserReward, fetchUserRewards } from "@/server/auth/api"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetchUserRewards()
        return NextResponse.json(
            {
                _metadata: { success: true },
                result: response.result,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error fetch rewards:", error)
        return NextResponse.json(
            {
                _metadata: { success: false },
                result: { total_diamonds: 0, is_claimed_today: false },
            },
            { status: 500 },
        )
    }
}

export async function PUT() {
    try {
        const response = await claimUserReward()
        return NextResponse.json(
            {
                _metadata: { success: true },
                result: response.result,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error claim reward:", error)
        return NextResponse.json(
            {
                _metadata: { success: false },
                result: { total_diamonds: 0 },
            },
            { status: 500 },
        )
    }
}

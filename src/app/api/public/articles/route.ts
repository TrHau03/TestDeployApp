import { createArticle, getAllArticles } from "@/server/article/api"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const articles = await getAllArticles()
        return NextResponse.json({ _metadata: { success: true }, result: { articles } })
    } catch (error) {
        console.error("❌ Failed to fetch articles:", error) // 👈 THÊM DÒNG NÀY
        return NextResponse.json({ _metadata: { success: false }, error: "Failed to fetch articles" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const created = await createArticle(body)
        return NextResponse.json({ _metadata: { success: true }, result: created })
    } catch (error) {
        console.error("❌ Failed to create article:", error) // 👈 bạn có thể thêm tương tự
        return NextResponse.json({ _metadata: { success: false }, error: "Failed to create article" }, { status: 400 })
    }
}

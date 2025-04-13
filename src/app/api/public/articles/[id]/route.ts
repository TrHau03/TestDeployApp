import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug, updateArticle, deleteArticle } from "@/server/article/api";
import { Params } from "@/app/api/_internal/type";

// GET bài viết chi tiết theo id (thực chất dùng id hoặc slug đều được nếu backend hỗ trợ)
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const {id} = await params
    const article = await getArticleBySlug(id);
    return NextResponse.json({ _metadata: { success: true }, result: { article } });
  } catch (error) {
    console.error("❌ Failed to fetch article:", error);
    return NextResponse.json({ _metadata: { success: false }, error: "Failed to fetch article" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const {id} = await params
    const body = await req.json();
    const updated = await updateArticle(Number(id), body);
    return NextResponse.json({ _metadata: { success: true }, result: updated });
  } catch (error) {
    console.error("❌ Failed to update article:", error);
    return NextResponse.json({ _metadata: { success: false }, error: "Failed to update article" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const {id} = await params
    const deleted = await deleteArticle(Number(id));
    return NextResponse.json({ _metadata: { success: true }, result: deleted });
  } catch (error) {
    console.error("❌ Failed to delete article:", error);
    return NextResponse.json({ _metadata: { success: false }, error: "Failed to delete article" }, { status: 400 });
  }
}

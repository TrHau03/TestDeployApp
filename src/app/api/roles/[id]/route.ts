import { NextRequest, NextResponse } from "next/server";
import {
  getPermissionById,
  updatePermission,
  deletePermission,
} from "@/server/permissions/api";
import { Params } from "../../_internal/type";

// ✅ GET: Lấy permission theo ID
export async function GET(req: NextRequest, {params} : Params) {
  const { id } = await params;

  try {
    const permission = await getPermissionById(Number(id));
    return NextResponse.json({
      _metadata: { success: true },
      result: { permission },
    });
  } catch (error) {
    console.error("❌ Failed to fetch permission:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to fetch permission" },
      { status: 404 }
    );
  }
}

// ✅ PUT: Cập nhật permission theo ID
export async function PUT(req: NextRequest, {params} : Params) {
  const { id } = await params;

  try {
    const body = await req.json();
    const updated = await updatePermission(Number(id), body);

    return NextResponse.json({
      _metadata: { success: true },
      result: updated,
    });
  } catch (error) {
    console.error("❌ Failed to update permission:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to update permission" },
      { status: 400 }
    );
  }
}

// ✅ DELETE: Xoá permission theo ID
export async function DELETE(req: NextRequest, {params} : Params) {
  const { id } = await params;

  try {
    const result = await deletePermission(Number(id));
    return NextResponse.json({
      _metadata: { success: true },
      result,
    });
  } catch (error) {
    console.error("❌ Failed to delete permission:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to delete permission" },
      { status: 400 }
    );
  }
}

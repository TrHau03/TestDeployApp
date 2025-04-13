import { deletePermission, getPermissionById, updatePermission } from "@/server/permissions/api"
import { NextRequest, NextResponse } from "next/server"
import { Params } from "../../_internal/type"

// ✅ GET
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params
        const permission = await getPermissionById(Number(id))
        return NextResponse.json({
            _metadata: { success: true },
            result: { permission },
        })
    } catch (error) {
        console.error("❌ Failed to fetch permission:", error)
        return NextResponse.json(
            { _metadata: { success: false }, error: "Failed to fetch permission" },
            { status: 404 },
        )
    }
}

// ✅ PUT
export async function PUT(_req: NextRequest, { params }: Params) {
    try {
        const body = await _req.json()
        const { id } = await params

        const updated = await updatePermission(Number(id), body)
        return NextResponse.json({
            _metadata: { success: true },
            result: updated,
        })
    } catch (error) {
        console.error("❌ Failed to update permission:", error)
        return NextResponse.json(
            { _metadata: { success: false }, error: "Failed to update permission" },
            { status: 400 },
        )
    }
}

// ✅ DELETE
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params
        const result = await deletePermission(Number(id))
        return NextResponse.json({
            _metadata: { success: true },
            result,
        })
    } catch (error) {
        console.error("❌ Failed to delete permission:", error)
        return NextResponse.json(
            { _metadata: { success: false }, error: "Failed to delete permission" },
            { status: 400 },
        )
    }
}

"use client"
import { useRouter } from "next/navigation"
// Bạn có thể định nghĩa `AppEndpointDynamic.ROLE_EDIT(id)` nếu có trang edit

type Props = {
    role: {
        id: number
    }
}

export default function RoleActionButtons({ role }: Props) {
    const router = useRouter()

    const handleEdit = () => {
        // Xử lý điều hướng hoặc logic sau này tại đây
        // router.push(AppEndpointDynamic.ROLE_EDIT(role.id));
    }

    const handleDelete = () => {
        // Xử lý logic xóa role sau này tại đây
    }

    return (
        <div className="flex items-center justify-center gap-3">
            <button
                onClick={handleEdit}
                className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-all"
            >
                Edit
            </button>
            <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-all"
            >
                Delete
            </button>
        </div>
    )
}

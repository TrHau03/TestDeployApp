// ✅ apps/admin/src/app/(admin)/permission/components/PermissionActionButtons.tsx
"use client";

import { useRouter } from "next/navigation";

type Props = {
  permission: {
    id: number;
  };
};

export default function PermissionActionButtons({ permission }: Props) {
  const router = useRouter();

  const handleEdit = () => {
    // Xử lý điều hướng sau này nếu có trang edit permission
    // router.push(AppEndpointDynamic.PERMISSION_EDIT(permission.id));
  };

  const handleDelete = () => {
    // Xử lý logic xoá permission sau này tại đây
  };

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
  );
}

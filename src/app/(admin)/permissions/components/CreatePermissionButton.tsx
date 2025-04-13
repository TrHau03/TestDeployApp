// ✅ apps/admin/src/app/(admin)/permission/components/CreatePermissionButton.tsx
"use client";

export default function CreatePermissionButton() {
  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
    >
      + Create Permission
    </button>
  );
}

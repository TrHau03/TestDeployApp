// ✅ apps/admin/src/app/(admin)/role/permission/page.tsx

import { getAllPermissions } from "@/server/permissions/api";
import PermissionTable from "./components/PermissionTable";
import CreatePermissionButton from "./components/CreatePermissionButton";

export default async function PermissionPage() {
  // const permissions = await getAllPermissions();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:text-xl">
          Permission List
        </h3>

        {/* ✅ Nút client-side: được tách riêng */}
        <CreatePermissionButton />
      </div>

      {/* <PermissionTable permissions={permissions} /> */}
    </div>
  );
}
import CreateRoleButton from "./components/CreateRoleButton" // 👈 Thêm dòng này

export default async function RolePage() {
    // const roles = await getAllRoles();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:text-xl">Role List</h3>
                {/* ✅ Nút client-side: được tách riêng */}
                <CreateRoleButton />
            </div>

            {/* <RoleTable roles={roles} /> */}
        </div>
    )
}

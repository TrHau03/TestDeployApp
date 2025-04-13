"use client";

import PermissionActionButtons from "./PermissionActionButtons";

type Permission = {
  id: number;
  name: string;
  guard_name?: string;
};

type Props = {
  permissions: Permission[];
};

export default function PermissionTable({ permissions }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left font-medium">
          <tr>
            <th className="px-4 py-3 border-r border-gray-300 text-center">Name</th>
            <th className="px-4 py-3 border-r border-gray-300 text-center">Guard</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr
              key={permission.id}
              className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2 border-r border-gray-200 text-center">{permission.name}</td>
              <td className="px-4 py-2 border-r border-gray-200 text-center">
                {permission.guard_name ?? "—"}
              </td>
              <td className="px-4 py-2 text-center">
                <PermissionActionButtons permission={permission} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

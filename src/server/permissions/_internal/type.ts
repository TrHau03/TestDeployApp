// ✅ apps/admin/src/server/permissions/_internal/type.ts

export interface Permission {
    id: number;
    name: string;
    guard_name?: string;
  }
  
  export interface PermissionCreateRequest extends Omit<Permission, "id"> {}
  
  export interface PermissionUpdateRequest extends PermissionCreateRequest {}
  
  export interface GetPermissionResponse {
    _metadata: {
      success: boolean;
    };
    result: {
      permission: Permission;
    };
  }
  
  export interface GetPermissionsResponse {
    _metadata: {
      success: boolean;
    };
    result: {
      permissions: Permission[];
    };
  }
  
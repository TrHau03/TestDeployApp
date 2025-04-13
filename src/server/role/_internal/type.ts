export interface Role {
    id: number;
    name: string;
    guard_name?: string;
    permissions: string[];
  }
  
  export interface RoleCreateRequest {
    name: string;
    guard_name?: string;
    permissions: string[];
  }
  
  export interface RoleUpdateRequest extends RoleCreateRequest {}
  
  export interface GetRolesResponse {
    _metadata: {
      success: boolean;
    };
    result: Role[];
  }
  
  export interface GetRoleResponse {
    _metadata: {
      success: boolean;
    };
    result: Role;
  }
  
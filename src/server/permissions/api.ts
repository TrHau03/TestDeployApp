// ✅ apps/admin/src/server/permissions/api.ts
import { HTTPEndpoint, HTTPEndpointDynamic } from "@/core/constants/endpoints"
import * as v from "valibot"
import http from "../integration/http"
import { GetPermissionSchema, GetPermissionsSchema } from "./_internal/schema"
import {
    GetPermissionResponse,
    GetPermissionsResponse,
    Permission,
    PermissionCreateRequest,
    PermissionUpdateRequest,
} from "./_internal/type"

export async function getAllPermissions(): Promise<Permission[]> {
    const response = await http.get(HTTPEndpoint.GET_ALL_PERMISSIONS).json<GetPermissionsResponse>()
    const validated = v.parse(GetPermissionsSchema, response)
    return validated.result.permissions
}

export async function createPermission(body: PermissionCreateRequest): Promise<Permission> {
    const response = await http.post(HTTPEndpoint.CREATE_PERMISSION, { json: body }).json<{ result: Permission }>()
    return response.result
}

export async function getPermissionById(id: number): Promise<Permission> {
    const response = await http.get<GetPermissionResponse>(HTTPEndpointDynamic.GET_PERMISSION_BY_ID(id)).json()
    const validated = v.parse(GetPermissionSchema, response)
    return validated.result.permission
}

export async function updatePermission(id: number, body: PermissionUpdateRequest): Promise<Permission> {
    const response = await http
        .put(HTTPEndpointDynamic.UPDATE_PERMISSION(id), { json: body })
        .json<{ result: Permission }>()
    return response.result
}

export async function deletePermission(id: number): Promise<{ message: string }> {
    const response = await http
        .delete(HTTPEndpointDynamic.DELETE_PERMISSION(id))
        .json<{ result: { message: string } }>()
    return response.result
}

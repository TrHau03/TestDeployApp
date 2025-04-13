import { HTTPEndpoint, HTTPEndpointDynamic } from "@/core/constants/endpoints";
import http from "../integration/http";
import * as v from "valibot";

import {
  Role,
  RoleCreateRequest,
  RoleUpdateRequest,
  GetRolesResponse,
  GetRoleResponse,
} from "./_internal/type";

import {
  GetRolesSchema,
  GetRoleSchema,
} from "./_internal/schema";

// GET all roles
export async function getAllRoles(): Promise<Role[]> {
  const response = await http.get(HTTPEndpoint.GET_ALL_ROLES).json<GetRolesResponse>();
  const validated = v.parse(GetRolesSchema, response);
  return validated.result;
}

// GET role by ID
export async function getRoleById(id: number): Promise<Role> {
  const response = await http.get(HTTPEndpointDynamic.GET_ROLE_BY_ID(id)).json<GetRoleResponse>();
  const validated = v.parse(GetRoleSchema, response);
  return validated.result;
}

// POST create role
export async function createRole(body: RoleCreateRequest): Promise<Role> {
  const response = await http.post(HTTPEndpoint.CREATE_ROLE, { json: body }).json<{ result: Role }>();
  return response.result;
}

// PUT update role
export async function updateRole(id: number, body: RoleUpdateRequest): Promise<Role> {
  const response = await http.put(HTTPEndpointDynamic.UPDATE_ROLE(id), { json: body }).json<{ result: Role }>();
  return response.result;
}

// DELETE role
export async function deleteRole(id: number): Promise<{ message: string }> {
  const response = await http.delete(HTTPEndpointDynamic.DELETE_ROLE(id)).json<{ result: { message: string } }>();
  return response.result;
}

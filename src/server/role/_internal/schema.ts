import * as v from "valibot";

export const RoleSchema = v.object({
  id: v.number(),
  name: v.string(),
  guard_name: v.optional(v.string()),
  permissions: v.array(v.string()),
});

export const GetRolesSchema = v.object({
  _metadata: v.object({
    success: v.boolean(),
  }),
  result: v.array(RoleSchema),
});

export const GetRoleSchema = v.object({
  _metadata: v.object({
    success: v.boolean(),
  }),
  result: RoleSchema,
});

export const RoleCreateSchema = v.object({
  name: v.string(),
  guard_name: v.optional(v.string()),
  permissions: v.array(v.string()),
});

export const RoleUpdateSchema = RoleCreateSchema;

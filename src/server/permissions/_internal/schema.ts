// ✅ apps/admin/src/server/permissions/_internal/schema.ts

import * as v from "valibot";

export const PermissionSchema = v.object({
  id: v.number(),
  name: v.string(),
  guard_name: v.optional(v.string()),
});

export const GetPermissionsSchema = v.object({
  _metadata: v.object({
    success: v.boolean(),
  }),
  result: v.object({
    permissions: v.array(PermissionSchema),
  }),
});

export const GetPermissionSchema = v.object({
  _metadata: v.object({
    success: v.boolean(),
  }),
  result: v.object({
    permission: PermissionSchema,
  }),
});

export const PermissionCreateSchema = v.object({
  name: v.string(),
  guard_name: v.optional(v.string()),
});

export const PermissionUpdateSchema = PermissionCreateSchema;

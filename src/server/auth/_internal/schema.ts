import * as v from 'valibot';
import { MetadataResponseSchema } from '../../_internal';

export const LoginResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    access_token: v.string(),
    token_type: v.string(),
    expires_at: v.nullable(v.string()),
    token_name: v.string(),
  }),
});

export const RegisterResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
});

export const LogoutResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
});
export const CurrentUserResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    user: v.object({
      id: v.number(),
      name: v.string(),
      email: v.pipe(v.string(), v.email()),
    }),
  }),
});

export const WeeklyStreakItemSchema = v.object({
  title: v.string(),
  status: v.union([v.boolean(), v.null()]),
});

export const StreakDataSchema = v.object({
  current: v.number(),
  highest: v.number(),
  last_login: v.string(),
  is_new_login_for_today: v.boolean(),
  weekly_streak: v.array(WeeklyStreakItemSchema),
});

export const LoginStreakResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    streak: StreakDataSchema,
    total_diamonds: v.optional(v.number()),
    is_claimed_today: v.optional(v.boolean()),
  }),
});

export const RewardsResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    total_diamonds: v.number(),
    is_claimed_today: v.optional(v.boolean()),
  }),
});

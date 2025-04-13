import * as v from 'valibot';

const EmailSchema = v.pipe(v.string(), v.email());

const AnonymousUserSchema = v.object({
  _tag: v.literal('ANONYMOUS'),
});

const AuthenticatedUserSchema = v.object({
  _tag: v.literal('ADMIN'),
  id: v.number(),
  name: v.string(),
  email: EmailSchema,
});

export const UserSchema = v.variant('_tag', [AnonymousUserSchema, AuthenticatedUserSchema]);

export const AuthResponseSchema = v.object({
  data: UserSchema,
});

export const LoginRequestSchema = v.object({
  email: EmailSchema,
  password: v.pipe(v.string(), v.minLength(8)),
});

export const LoginResponseSchema = v.object({});

export const RegisterRequestSchema = v.object({
  ...LoginRequestSchema.entries,
  ...v.pick(AuthenticatedUserSchema, ['name']).entries,
});

import * as v from 'valibot';
import { LoginRequestSchema, LoginResponseSchema, RegisterRequestSchema, UserSchema } from './schema';

export type User = v.InferOutput<typeof UserSchema>;

export type LoginRequest = v.InferOutput<typeof LoginRequestSchema>;

export type LoginResponse = v.InferOutput<typeof LoginResponseSchema>;

export type RegisterRequest = v.InferOutput<typeof RegisterRequestSchema>;

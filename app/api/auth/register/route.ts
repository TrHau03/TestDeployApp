import * as v from 'valibot';
import { RegisterRequestSchema } from '@/core/auth';
import { register } from '@/server/auth/api';

export async function POST(request: Request) {
  const validated = v.parse(RegisterRequestSchema, await request.json());
  await register(validated);
  return Response.json({});
}

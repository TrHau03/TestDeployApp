import { LoginRequestSchema } from "@/core/auth"
import { login } from "@/server/auth/api"
import { setAccessToken } from "@/server/token"
import * as v from "valibot"

export async function POST(request: Request) {
    const validated = v.parse(LoginRequestSchema, await request.json())
    const response = await login(validated)
    await setAccessToken(response.result.access_token)
    return Response.json({})
}

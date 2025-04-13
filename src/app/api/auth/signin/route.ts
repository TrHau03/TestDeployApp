import { LoginRequestSchema } from "@/core/auth"
import { signin } from "@/server/auth/api"
import { setAccessToken } from "@/server/token"
import * as v from "valibot"

export async function POST(request: Request) {
    try {
        const validated = v.parse(LoginRequestSchema, await request.json())
        const response = await signin(validated)
        if (response) {
            await setAccessToken(response.result.access_token)
        }
        return Response.json({})
    } catch (error: any) {
        console.error("Error during sign in:", error)
        throw new Error(error.message)
    }
}

import { LoginRequest, RegisterRequest } from "@/core/auth"
import { HTTPEndpoint } from "@/core/constants/endpoints"
import { logger } from "@/core/utils/logger"
import * as v from "valibot"
import http from "../integration/http"
import { CurrentUserResponseSchema, LoginResponseSchema, RegisterResponseSchema } from "./_internal"

export async function fetchAuthenticatedUser() {
    const response = await http.get("auth/me").json()
    const validated = v.parse(CurrentUserResponseSchema, response)
    return validated
}

export async function signin(request: LoginRequest) {
    try {
        console.log("request", request)
        const response = await http
            .post(HTTPEndpoint.SIGNIN, {
                json: request,
            })
            .json()
        console.log("response", response)
        const validated = v.parse(LoginResponseSchema, response)
        return validated
    } catch (error) {
        console.error("Error during sign in:", error)
        return null
    }
}

export async function register(request: RegisterRequest) {
    const response = await http.post(HTTPEndpoint.SIGNUP, { json: request }).json()
    const validated = v.parse(RegisterResponseSchema, response)
    return validated
}

export async function logout() {
    try {
        await http.post(HTTPEndpoint.SIGNOUT)
        return true
    } catch (error) {
        logger.error(error)
        return false
    }
}

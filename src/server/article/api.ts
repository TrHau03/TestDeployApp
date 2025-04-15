import * as v from "valibot"
import http from "../integration/http"
import {
    GetPublishedArticleSchema,
    GetPublishedArticlesSchema,
} from "./_internal/schema"
import { GetPublishedArticleResponse } from "./_internal/type"

async function getPublishedArticles() {
    const response = await http.get("public/articles").json()
    const validated = v.parse(GetPublishedArticlesSchema, response)
    return validated
}

async function getPublishedArticle(slug: string) {
    const response = await http
        .get<GetPublishedArticleResponse>(`public/articles/${slug}`)
        .json()
    const validated = v.parse(GetPublishedArticleSchema, response)
    return validated
}

export { getPublishedArticle, getPublishedArticles }

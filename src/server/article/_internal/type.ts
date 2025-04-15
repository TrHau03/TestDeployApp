import * as v from "valibot"
import { GetPublishedArticleSchema, GetPublishedArticlesSchema } from "./schema"

type GetPublishedArticlesResponse = v.InferOutput<
    typeof GetPublishedArticlesSchema
>
type GetPublishedArticleResponse = v.InferOutput<
    typeof GetPublishedArticleSchema
>

export type { GetPublishedArticleResponse, GetPublishedArticlesResponse }

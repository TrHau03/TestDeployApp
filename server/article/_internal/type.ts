import { GetPublishedArticleSchema, GetPublishedArticlesSchema } from '@/server/article/_internal/schema';
import * as v from 'valibot';

type GetPublishedArticlesResponse = v.InferOutput<typeof GetPublishedArticlesSchema>;
type GetPublishedArticleResponse = v.InferOutput<typeof GetPublishedArticleSchema>;

export type { GetPublishedArticlesResponse, GetPublishedArticleResponse };

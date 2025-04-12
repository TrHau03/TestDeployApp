import * as v from 'valibot';
import { MetadataResponseSchema } from '@/server/_internal';

const GetPublishedArticlesSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    articles: v.array(
      v.object({
        id: v.number(),
        title: v.string(),
        slug: v.string(),
        thumbnail: v.nullable(v.string()),
        abstract: v.string(),
        created_at: v.nullable(v.string()),
        updated_at: v.nullable(v.string()),
      }),
    ),
  }),
});

const GetPublishedArticleSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    article: v.object({
      id: v.number(),
      title: v.string(),
      slug: v.string(),
      thumbnail: v.nullable(v.string()),
      abstract: v.string(),
      content: v.string(),
      tags: v.array(v.string()),
      created_at: v.nullable(v.string()),
      updated_at: v.nullable(v.string()),
    }),
  }),
});

export { GetPublishedArticlesSchema, GetPublishedArticleSchema };

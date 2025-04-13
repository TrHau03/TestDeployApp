import * as v from "valibot";

// ✅ Schema chi tiết cho 1 bài viết
export const ArticleSchema = v.object({
  id: v.number(),
  title: v.string(),
  slug: v.string(),
  content: v.optional(v.string()),
  abstract: v.optional(v.union([v.string(), v.null_()])),
  thumbnail: v.optional(v.union([v.string(), v.null_()])),
  category_id: v.optional(v.union([v.number(), v.null_()])),
  status: v.optional(
    v.union([
      v.literal("draft"),
      v.literal("published"),
      v.literal("archived"),
    ])
  ),
  tags: v.optional(v.array(v.string())),
  created_at: v.string(),
  updated_at: v.string(),
});

// ✅ Schema validate danh sách bài viết
export const GetPublishedArticlesSchema = v.object({
  _metadata: v.object({
    success: v.boolean(),
  }),
  result: v.object({
    articles: v.array(ArticleSchema),
  }),
});

// ✅ Schema validate chi tiết bài viết
export const GetPublishedArticleSchema = v.object({
  _metadata: v.object({
    success: v.boolean(),
  }),
  result: v.object({
    article: ArticleSchema,
  }),
});

// ✅ Schema validate response khi publish bài viết
export const PublishArticleResponseSchema = v.object({
  _metadata: v.object({
    success: v.boolean(),
  }),
  result: v.object({
    message: v.string(),
    article: ArticleSchema,
  }),
});

// ✅ Schema validate input tạo bài viết
export const ArticleCreateSchema = v.object({
  title: v.pipe(v.string(), v.maxLength(255)),
  slug: v.optional(v.pipe(v.string(), v.maxLength(255))),
  content: v.string(),
  abstract: v.optional(v.union([v.string(), v.null_()])),
  thumbnail: v.optional(v.union([v.string(), v.null_()])),
  category_id: v.optional(v.union([v.number(), v.null_()])),
  status: v.optional(
    v.union([
      v.literal("draft"),
      v.literal("published"),
      v.literal("archived"),
      v.null_(),
    ])
  ),
  tags: v.optional(v.union([v.array(v.string()), v.null_()])),
});

// ✅ Schema validate input cập nhật bài viết (giống tạo)
export const ArticleUpdateSchema = ArticleCreateSchema;

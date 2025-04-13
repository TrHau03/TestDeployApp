import { HTTPEndpoint, HTTPEndpointDynamic } from "@/core/constants/endpoints";
import * as v from "valibot";
import http from "../integration/http";
import {
  GetPublishedArticlesSchema,
  GetPublishedArticleSchema,
} from "./_internal/schema";
import {
  Article,
  GetPublishedArticleResponse,
  GetPublishedArticlesResponse,
  ArticleCreateRequest,
  ArticleUpdateRequest,
} from "./_internal/type";

// Lấy danh sách bài viết
export async function getAllArticles(): Promise<Article[]> {
  const response = await http
    .get(HTTPEndpoint.GET_ALL_ARTICLES)
    .json<GetPublishedArticlesResponse>();
  const validated = v.parse(GetPublishedArticlesSchema, response);
  return validated.result.articles as Article[];
}

// Tạo bài viết mới
export async function createArticle(body: ArticleCreateRequest): Promise<Article> {
  const response = await http
    .post(HTTPEndpoint.CREATE_ARTICLE, { json: body })
    .json<{ result: { article: Article } }>();
  return response.result.article;
}

// Lấy bài viết theo slug
export async function getArticleBySlug(slug: string): Promise<Article> {
  const response = await http
    .get<GetPublishedArticleResponse>(
      HTTPEndpointDynamic.GET_ARTICLE_BY_SLUG(slug)
    )
    .json();
  const validated = v.parse(GetPublishedArticleSchema, response);
  return validated.result.article as Article;

}

// Cập nhật bài viết theo id
export async function updateArticle(id: number, body: ArticleUpdateRequest): Promise<Article> {
  const response = await http
    .put(HTTPEndpointDynamic.UPDATE_ARTICLE(id), {
      json: body,
    })
    .json<{ result: { article: Article } }>();
  return response.result.article;
}

// Xoá bài viết
export async function deleteArticle(id: number): Promise<{ message: string }> {
  const response = await http
    .delete(HTTPEndpointDynamic.DELETE_ARTICLE(id))
    .json<{ result: { message: string } }>();
  return response.result;
}

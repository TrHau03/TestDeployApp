import { getPublishedArticles } from '@/server/article/api';

export async function GET() {
  const response = await getPublishedArticles();
  return Response.json(response);
}

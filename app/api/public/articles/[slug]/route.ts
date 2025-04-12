import { getPublishedArticle } from '@/server/article/api';

async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getPublishedArticle(slug);
  return Response.json(response);
}

export { GET };

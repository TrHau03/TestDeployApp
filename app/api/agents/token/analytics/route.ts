import { requestToken } from '@/server/agent/api';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await requestToken(body);
  const token: { content: string } = {
    content: response.result.report.context,
  };
  return Response.json({
    data: token,
  });
}

import { User } from '@/core/auth';
import { fetchAuthenticatedUser } from '@/server/auth/api';
import { removeAccessToken } from '@/server/token';

const anonymousUser: User = {
  _tag: 'ANONYMOUS',
};

export async function GET() {
  try {
    const response = await fetchAuthenticatedUser();
    const user: User = {
      _tag: 'ADMIN',
      id: response.result.user.id,
      email: response.result.user.email,
      name: response.result.user.name,
    };
    return Response.json({ data: user });
  } catch {
    removeAccessToken();
    return Response.json({
      data: anonymousUser,
    });
  }
}

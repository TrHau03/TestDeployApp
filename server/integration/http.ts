import ky from 'ky';
import { getAccessToken } from '../token';

const { API_URL } = process.env;

const http = ky.create({
  prefixUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.url === `${API_URL}/auth/login`) {
          return;
        }

        const tokenCookie = await getAccessToken();
        if (!tokenCookie) {
          return;
        }

        request.headers.set('Authorization', `Bearer ${tokenCookie.value}`);
      },
    ],
  },
});

export default http;

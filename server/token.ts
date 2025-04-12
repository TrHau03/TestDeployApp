import { cookie } from './integration/cookie';

export const { get: getAccessToken, set: setAccessToken, remove: removeAccessToken } = cookie('x-access-token');

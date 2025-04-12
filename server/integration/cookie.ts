import { cookies } from 'next/headers';

export const cookie = (key: string) => {
  const get = async () => {
    const cookieStore = await cookies();
    return cookieStore.get(key);
  };
  const set = async (value: string) => {
    const cookieStore = await cookies();
    cookieStore.set(key, value, {
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
  };
  const remove = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
  };
  return {
    get,
    set,
    remove,
  };
};

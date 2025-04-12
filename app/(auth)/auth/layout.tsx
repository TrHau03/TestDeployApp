import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;
export default async function AuthLayout({ children }: Props) {
  return <div className="min-h-screen text-black dark:text-white-dark">{children}</div>;
}

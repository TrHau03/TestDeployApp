import { AuthProvider } from '@/client/auth';
import ProviderComponent from '@/components/layouts/provider-component';
import '@/styles/tailwind.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import 'react-perfect-scrollbar/dist/css/styles.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Meet your AI agents',
    default: 'AINOSHA - Meet your AI agents',
  },
};
const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(nunito.variable, 'dark')}>
        <AuthProvider>
          <ProviderComponent>{children}</ProviderComponent>
        </AuthProvider>
      </body>
    </html>
  );
}

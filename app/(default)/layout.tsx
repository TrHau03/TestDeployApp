import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import ScrollToTop from '@/components/layouts/scroll-to-top';
import Portals from '@/components/portals';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        <ScrollToTop />

        <MainContainer>
          {/* BEGIN SIDEBAR */}
          {/* END SIDEBAR */}
          <div className="main-content flex min-h-screen flex-col">
            {/* BEGIN TOP NAVBAR */}
            <Header />
            {/* END TOP NAVBAR */}

            {/* BEGIN CONTENT AREA */}
            <ContentAnimation>{children}</ContentAnimation>
            {/* END CONTENT AREA */}

            {/* BEGIN FOOTER */}
            <Footer />
            {/* END FOOTER */}
            <Portals />
          </div>
        </MainContainer>
      </div>
    </>
  );
}

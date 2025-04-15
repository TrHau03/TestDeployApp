import ContentAnimation from "@/core/components/layouts/content-animation"
import Footer from "@/core/components/layouts/footer"
import Header from "@/core/components/layouts/header"
import MainContainer from "@/core/components/layouts/main-container"
import ScrollToTop from "@/core/components/layouts/scroll-to-top"
import Portals from "@/core/components/portals"
import { PropsWithChildren } from "react"

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
    )
}

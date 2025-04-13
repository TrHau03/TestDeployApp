import { Outfit } from "next/font/google"
import "./globals.css"

import { AuthProvider } from "@/core/context/AuthContext"
import { SidebarProvider } from "@/core/context/SidebarContext"
import { ThemeProvider } from "@/core/context/ThemeContext"

const outfit = Outfit({
    subsets: ["latin"],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className}  bg-white dark:bg-gray-900`}>
                <AuthProvider>
                    <ThemeProvider>
                        <SidebarProvider>{children}</SidebarProvider>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    )
}

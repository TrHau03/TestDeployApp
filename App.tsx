"use client"
import Loading from "@/components/layouts/loading"
import {
    toggleAnimation,
    toggleLayout,
    toggleMenu,
    toggleNavbar,
    toggleRTL,
    toggleSemidark,
} from "@/store/themeConfigSlice"
import { PropsWithChildren, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "./core/hooks/useRedux"

function App({ children }: PropsWithChildren) {
    const themeConfig = useAppSelector((state) => state.themeConfig)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu))
        dispatch(
            toggleLayout(localStorage.getItem("layout") || themeConfig.layout),
        )
        dispatch(
            toggleRTL(localStorage.getItem("rtlClass") || themeConfig.rtlClass),
        )
        dispatch(
            toggleAnimation(
                localStorage.getItem("animation") || themeConfig.animation,
            ),
        )
        dispatch(
            toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar),
        )
        dispatch(
            toggleSemidark(
                localStorage.getItem("semidark") || themeConfig.semidark,
            ),
        )
        // locale

        setIsLoading(false)
    }, [
        dispatch,
        themeConfig.theme,
        themeConfig.menu,
        themeConfig.layout,
        themeConfig.rtlClass,
        themeConfig.animation,
        themeConfig.navbar,
        themeConfig.locale,
        themeConfig.semidark,
    ])

    return (
        <div
            className={`${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            {isLoading ? <Loading /> : children}
        </div>
    )
}

export default App

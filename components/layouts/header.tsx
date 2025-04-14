"use client"
import { showAlert } from "@/app/_internal/utils/toast"
import { useTriggerAuth, useUser } from "@/client/auth"
import http from "@/client/integration/http"
import { useAppSelector } from "@/core/hooks/useRedux"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import useSWRMutation from "swr/mutation"
import LoginStreakIcon from "../common/login-streak/login-streakikon"
import Dropdown from "../dropdown"
import IconChevronDown from "../icon/icon-chev-down"
import IconChevronUp from "../icon/icon-chev-up"
import IconLogout from "../icon/icon-logout"

const Header = () => {
    const pathname = usePathname()
    const user = useUser()
    const [menuOpen, setMenuOpen] = useState(false)
    const [chatSubMenuOpen, setChatSubMenuOpen] = useState(false)
    useEffect(() => {
        const selector = document.querySelector(
            'ul.horizontal-menu a[href="' + window.location.pathname + '"]',
        )
        if (selector) {
            const all = document.querySelectorAll(
                "ul.horizontal-menu .nav-link.active",
            )
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove("active")
            }

            const allLinks = document.querySelectorAll(
                "ul.horizontal-menu a.active",
            )
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i]
                element?.classList.remove("active")
            }
            selector?.classList.add("active")

            const ul = selector.closest("ul.sub-menu")
            if (ul) {
                let ele: any = ul
                    ?.closest("li.menu")
                    ?.querySelectorAll(".nav-link")
                if (ele) {
                    ele = ele[0]
                    setTimeout(() => {
                        ele?.classList.add("active")
                    })
                }
            }
        }
    }, [pathname])

    const isRtl =
        useAppSelector((state) => state.themeConfig.rtlClass) === "rtl"

    const themeConfig = useAppSelector((state) => state.themeConfig)

    const triggerAuth = useTriggerAuth()

    const { trigger: logout, isMutating } = useSWRMutation<
        unknown,
        Error,
        string,
        unknown
    >("/api/auth/logout", () => http.post("/api/auth/logout"), {
        onSuccess: async () => {
            showAlert({
                icon: "success",
                title: "Logged Out",
                text: "You have been logged out successfully!",
            })
            triggerAuth()
        },
        onError: async () => {
            showAlert({
                icon: "error",
                title: "Error!",
                text: "There was a problem logging you out. Please try again.",
            })
        },
    })

    const handleCloseMenu = () => {
        setMenuOpen(false)
        setChatSubMenuOpen(false)
    }

    return (
        <header
            className={`z-40 ${themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""} border-b-[0.5px] border-border border-opacity-0`}
        >
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-start py-2">
                        <Link
                            href="/"
                            onClick={handleCloseMenu}
                            className="main-logo flex items-center gap-2 transition-all duration-300 hover:opacity-80"
                        >
                            <Image
                                className="h-10 w-10 rounded-[100px]  object-contain"
                                src="/assets/images/logoApp.png"
                                alt="Ainosha logo"
                                width={40}
                                height={40}
                            />

                            <span className="hidden bg-gradient-to-r from-[#01FFFF] to-[#D205D9] bg-clip-text text-xl font-bold tracking-wide text-transparent sm:block">
                                Ainosha
                            </span>
                        </Link>
                    </div>

                    {/* Mobile menu - Hiển thị chỉ trên mobile */}
                    <div className="relative block sm:hidden">
                        {/* Toggle Menu Button */}
                        <button
                            onClick={() => {
                                setMenuOpen((prev) => !prev)
                                setChatSubMenuOpen(false)
                            }}
                            className="p-2 text-black dark:text-white"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="absolute left-0 mt-2 w-64 z-50 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl">
                                <nav className="text-base font-medium">
                                    <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                                        {/* Dashboard */}
                                        <li>
                                            <Link
                                                href="/"
                                                onClick={handleCloseMenu}
                                                className={`block w-full p-4 rounded-t-xl transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                    pathname === "/"
                                                        ? "text-primary"
                                                        : "text-black dark:text-white"
                                                }`}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>

                                        {/* Chat with submenu */}
                                        <li>
                                            <button
                                                onClick={() =>
                                                    setChatSubMenuOpen(
                                                        !chatSubMenuOpen,
                                                    )
                                                }
                                                className="w-full flex items-center justify-between p-4 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
                                            >
                                                <span>Chat</span>
                                                {chatSubMenuOpen ? (
                                                    <IconChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <IconChevronDown className="w-4 h-4" />
                                                )}
                                            </button>
                                            {chatSubMenuOpen && (
                                                <ul className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
                                                    <li>
                                                        <Link
                                                            href="/chat/market-scan"
                                                            onClick={
                                                                handleCloseMenu
                                                            }
                                                            className={`block w-full px-3 py-2 rounded-md transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                                                pathname ===
                                                                "/chat/market-scan"
                                                                    ? "text-primary"
                                                                    : "text-black dark:text-white"
                                                            }`}
                                                        >
                                                            Market Scan
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/chat/coin-deep"
                                                            onClick={
                                                                handleCloseMenu
                                                            }
                                                            className={`block w-full px-3 py-2 rounded-md transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                                                pathname ===
                                                                "/chat/coin-deep"
                                                                    ? "text-primary"
                                                                    : "text-black dark:text-white"
                                                            }`}
                                                        >
                                                            Coin Deep
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>

                                        {/* Articles */}
                                        <li>
                                            <Link
                                                href="/articles"
                                                onClick={handleCloseMenu}
                                                className={`block w-full p-4 rounded-b-xl transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                    pathname === "/articles"
                                                        ? "text-primary"
                                                        : "text-black dark:text-white"
                                                }`}
                                            >
                                                Articles
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </div>

                    {/* Desktop navigation - Ẩn trên mobile, hiển thị từ sm trở lên */}
                    <div className="hidden w-full justify-center sm:flex">
                        <div className="self-center">
                            <nav className="nav text-lg font-semibold">
                                <ul className="flex items-center">
                                    <li className="group p-4">
                                        <Link
                                            href="/"
                                            className={`relative inline-block font-bold ${
                                                pathname === "/"
                                                    ? "text-primary"
                                                    : "text-black dark:text-white"
                                            }`}
                                        >
                                            <span className="relative">
                                                <span className="inline-block">
                                                    Dashboard
                                                </span>
                                                {pathname !== "/" && (
                                                    <>
                                                        <span className="absolute left-0 h-full w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-full">
                                                            Dashboard
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="group p-4">
                                        <div className="relative group">
                                            <div
                                                className={`relative inline-block font-bold ${
                                                    pathname === "/chat"
                                                        ? "text-primary"
                                                        : "text-black dark:text-white"
                                                }`}
                                            >
                                                <span className="relative">
                                                    <span className="inline-block">
                                                        Chat Bot
                                                    </span>
                                                    {pathname !== "/chat" && (
                                                        <span className="absolute left-0 h-full w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-full">
                                                            Chat Bot
                                                        </span>
                                                    )}
                                                </span>
                                            </div>

                                            {/* Dropdown menu */}
                                            <div className="absolute left-0 mt-2 hidden flex-col space-y-1 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-md p-2 group-hover:flex z-50 w-max">
                                                <Link
                                                    href="/chat/market-scan"
                                                    className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                                >
                                                    Market Scan
                                                </Link>
                                                <Link
                                                    href="/chat/coin-deep"
                                                    className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                                >
                                                    Coin Deep
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="group p-4">
                                        <Link
                                            href="/articles"
                                            className={`relative inline-block font-bold ${
                                                pathname === "/articles"
                                                    ? "text-primary"
                                                    : "text-black dark:text-white"
                                            }`}
                                        >
                                            <span className="relative">
                                                <span className="inline-block">
                                                    Articles
                                                </span>
                                                {pathname !== "/articles" && (
                                                    <span className="absolute left-0 h-full w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-full">
                                                        Articles
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
                        <>
                            <LoginStreakIcon />
                            <div className="dropdown flex shrink-0">
                                {user._tag === "AUTHENTICATED" ? (
                                    <Dropdown
                                        offset={[0, 8]}
                                        placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                                        btnClassName="relative group block"
                                        button={
                                            <img
                                                className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                                src="/assets/images/user-profile.jpeg"
                                                alt="userProfile"
                                            />
                                        }
                                    >
                                        <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                            <li>
                                                <div className="flex items-center px-4 py-4">
                                                    <img
                                                        className="h-10 w-10 rounded-md object-cover"
                                                        src="/assets/images/user-profile.jpeg"
                                                        alt="userProfile"
                                                    />
                                                    <div className="truncate ltr:pl-4 rtl:pr-4">
                                                        <h4 className="text-base">
                                                            {user.name}
                                                        </h4>
                                                        <button
                                                            type="button"
                                                            className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                        >
                                                            {user.email}
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="border-t border-white-light dark:border-white-light/10">
                                                <button
                                                    disabled={isMutating}
                                                    className="!py-3 text-danger"
                                                    onClick={logout}
                                                >
                                                    <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                                                    Sign Out
                                                </button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                ) : (
                                    <Link
                                        href="/auth/login"
                                        className="text-base font-bold text-primary"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

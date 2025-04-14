"use client"
import { toggleSidebar } from "@/store/themeConfigSlice"
import { useDispatch } from "react-redux"

const Overlay = () => {
    const dispatch = useDispatch()
    return (
        <>
            {/* sidebar menu overlay */}
            <div
                className={`fixed inset-0 z-50 bg-[black]/60 lg:hidden`}
                onClick={() => dispatch(toggleSidebar())}
            ></div>
        </>
    )
}

export default Overlay

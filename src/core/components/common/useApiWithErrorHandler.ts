"use client"

import { showAlert } from "@/app/_internal/utils/toast"
import { useState } from "react"

type ApiFunction<T> = () => Promise<T>

export function useApiWithErrorHandler<T = any>(apiFn: ApiFunction<T>) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)

    const trigger = async () => {
        setLoading(true)
        try {
            const result = await apiFn()
            setData(result)
        } catch (err: any) {
            // ⚠️ Xử lý status + statusText (nếu có)
            const status = err?.response?.status
            const statusText = err?.response?.statusText || "Unknown Error"
            const apiMessage = err?.response?.data?.message

            // ✨ Gộp lại thành 1 dòng: "Request failed with status code 404: Not Found"
            const title = `Request failed with status code ${status}: ${statusText}`

            // ✅ Nếu có message từ API → thêm mô tả phụ bên dưới
            showAlert({
                icon: "error",
                title,
                text: apiMessage ?? "", // nếu không có thì text rỗng
            })
        } finally {
            setLoading(false)
        }
    }

    return {
        data,
        loading,
        trigger,
    }
}

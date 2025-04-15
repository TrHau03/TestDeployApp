"use client"
import { store } from "@/store"
import App from "App"
import { ReactNode, Suspense } from "react"
import { Provider } from "react-redux"
import Loading from "./loading"

interface IProps {
    children?: ReactNode
}

const ProviderComponent = ({ children }: IProps) => {
    return (
        <Provider store={store}>
            <Suspense fallback={<Loading />}>
                <App>{children} </App>
            </Suspense>
        </Provider>
    )
}

export default ProviderComponent

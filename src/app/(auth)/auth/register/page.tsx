import IconArrowBackward from "@/core/components/icon/icon-arrow-backward"
import IconGoogle from "@/core/components/icon/icon-google"
import IconTwitter from "@/core/components/icon/icon-twitter"
import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "./_internal"

export const metadata: Metadata = {
    title: "Register Boxed",
}

const RegisterPage = () => {
    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/bg.jpg)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative w-full max-w-[570px] rounded-md">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/80 lg:min-h-[758px]">
                        <div className="absolute start-6 top-6">
                            <Link href={"/"}>
                                <IconArrowBackward className="h-10 w-10" />
                            </Link>
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">
                                    Sign Up
                                </h1>
                                <p className="text-base font-bold leading-normal text-white-dark">
                                    Enter your email and password to sign up
                                </p>
                            </div>
                            <RegisterForm />
                            <div className="relative my-7 text-center md:mb-9">
                                <span
                                    className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-white-light dark:bg-white-dark"
                                    style={{ width: "40%" }}
                                ></span>
                                <span className="relative px-2 font-bold uppercase text-white-dark dark:text-white-light">
                                    OR
                                </span>
                                <span
                                    className="absolute right-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-white-light dark:bg-white-dark"
                                    style={{ width: "40%" }}
                                ></span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <Link
                                            href="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(90deg,rgb(135,255,0),rgb(38,77,74))] p-0 transition hover:scale-110"
                                        >
                                            <IconTwitter fill={true} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(90deg,rgb(135,255,0),rgb(38,77,74))] p-0 transition hover:scale-110"
                                        >
                                            <IconGoogle />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center dark:text-white">
                                Don&apos;t have an account ?&nbsp;
                                <Link
                                    href="/auth/register"
                                    className="font-bold text-primary transition hover:text-black dark:hover:text-white"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage

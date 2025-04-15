import clsx from "clsx"
import Image from "next/image"

type ChatItemProps = {
    name: string
    logo: string
    isActive: boolean
    onSelect?: (name: string) => void
}
export default function CoinItem({
    name,
    logo,
    isActive,
    onSelect,
}: ChatItemProps) {
    return (
        <li
            onClick={() => onSelect && onSelect(name)}
            className={clsx(
                "flex w-full cursor-pointer items-center justify-between rounded-md p-2",
                {
                    "bg-gray-100 text-primary dark:bg-[#050b146a] dark:text-primary":
                        isActive,
                    "hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b146a] dark:hover:text-primary":
                        !isActive,
                },
            )}
        >
            <div className="flex-1">
                <div className="flex items-center">
                    <div className="relative flex-shrink-0">
                        <Image
                            src={logo}
                            alt=""
                            className=" rounded-full object-cover w-8 h-8"
                        />
                        <div>
                            <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                <div className="h-3 w-3 rounded-full bg-success" />
                            </div>
                        </div>
                    </div>
                    <div className="mx-3 ltr:text-left rtl:text-right">
                        <p className="mb-1 font-semibold">{name}</p>
                        {/* <p className="max-w-[185px] truncate text-xs text-white-dark">{chat.lastMessage}</p> */}
                    </div>
                </div>
            </div>
        </li>
    )
}

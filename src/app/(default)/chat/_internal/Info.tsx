import { Agent } from "@/core/agent"
import Image from "next/image"

const Info = ({ profile }: { profile: Agent }) => {
    return (
        <div className="col-span-2 overflow-hidden rounded-lg shadow-lg">
            <div className="p-4">
                {/* Hàng 1: Image và Name */}
                <div className="flex items-center gap-2">
                    <div className="mr-3 flex-shrink-0">
                        <Image
                            src={profile.avatarURL}
                            alt={profile.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                    <h2 className="truncate text-lg font-bold text-white">
                        {profile.name}
                    </h2>
                </div>

                <div className="mt-2 flex items-center">
                    <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                        {profile.type.replace("-", " ")}
                    </span>
                    <span className="ml-2 truncate text-xs text-gray-400">
                        #{profile.slug}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-xs font-semibold uppercase text-gray-400">
                        Description
                    </h3>
                    <p className="mt-1 text-sm text-gray-300">
                        {profile.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Info

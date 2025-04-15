import { FC } from "react"

interface IconChecksProps {
    className?: string
}

const IconChevronDown: FC<IconChecksProps> = ({ className }) => {
    return (
        <svg
            fill="#e5e7eb"
            height="200px"
            width="200px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 407.437 407.437"
            className={className}
            stroke="#e5e7eb"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "></polygon>{" "}
            </g>
        </svg>
    )
}

export default IconChevronDown

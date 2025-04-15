import { FC } from "react"

interface IconChecksProps {
    className?: string
}

const IconChevronUp: FC<IconChecksProps> = ({ className }) => {
    return (
        <svg
            fill="#e5e7eb"
            height="200px"
            width="200px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 407.436 407.436"
            className={className}
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <polygon points="203.718,91.567 0,294.621 21.179,315.869 203.718,133.924 386.258,315.869 407.436,294.621 "></polygon>{" "}
            </g>
        </svg>
    )
}

export default IconChevronUp

interface PrimaryButtonProps {
    onClick?: any
    children: React.ReactNode
    className: string
    type: "submit" | "reset" | "button" | undefined
    title?: string
}

export default function PrimaryButton({ onClick, children, className, type, title }: PrimaryButtonProps) {
    return (
        <button
            title={title}
            type={type}
            onClick={onClick}
            className={` hover:cursor-pointer rounded px-4 py-2 text-xl ${className} `}>
            {children}
        </button>
    )
}
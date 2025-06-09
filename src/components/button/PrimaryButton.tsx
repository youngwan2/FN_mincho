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
            className={`${className.includes('text-2xl') ? null : 'text-xl'} hover:cursor-pointer rounded px-4 py-2 ${className}  `}>
            {children}
        </button>
    )
}
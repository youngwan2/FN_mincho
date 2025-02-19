import { useFormStatus } from "react-dom"

interface SubmitProps {
    className?: string
    text: string
    disabled: boolean
}

export default function Submit({ className, text, disabled }: SubmitProps) {

    const { pending } = useFormStatus();

    return (
        <button  type="submit" className={className + ` ${disabled ? 'cursor-not-allowed' : ''}`} disabled={disabled || pending}>
            {pending ? '전송중...' : text}
        </button>
    )
}
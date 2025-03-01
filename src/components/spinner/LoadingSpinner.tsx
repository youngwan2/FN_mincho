import MoonLoader from "react-spinners/MoonLoader";

interface LoadingSpinnerProps {
    size?: number
}

export default function LoadingSpinner({ size = 50 }: LoadingSpinnerProps) {
    return (
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50% z-10] ">
            <MoonLoader
                size={size}
                aria-label="Loading Spinner"
            />
        </div>
    )
}
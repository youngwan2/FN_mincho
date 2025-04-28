import MoonLoader from "react-spinners/MoonLoader";

interface LoadingSpinnerProps {
    size?: number
    fixed?: boolean
}

export default function StaticLoadingSpinner({ size = 25 }: LoadingSpinnerProps) {
    return (
        <div className={`flex flex-col justify-center items-center z-10 w-full `}>
            <MoonLoader
                className=" mx-auto"
                size={size}
                aria-label="Loading Spinner"
            />
            <p className="mt-5">이전 알림 조회중..</p>
        </div>
    )
}
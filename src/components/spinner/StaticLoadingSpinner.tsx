import MoonLoader from "react-spinners/MoonLoader";

interface LoadingSpinnerProps {
    size?: number
    fixed?: boolean
}

export default function StaticLoadingSpinner({ size = 50 }: LoadingSpinnerProps) {
    return (
        <div className={`flex flex-col justify-center items-center z-10 w-full `}>
            <MoonLoader
                className=" mx-auto"
                size={size}
                aria-label="Loading Spinner"
            />
            <p className="mt-5">최신 목록을 불러오는 중입니다.</p>
        </div>
    )
}
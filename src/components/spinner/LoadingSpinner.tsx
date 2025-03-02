import MoonLoader from "react-spinners/MoonLoader";

interface LoadingSpinnerProps {
    size?: number
    fixed?:boolean
}

export default function LoadingSpinner({ size = 50, fixed= false }: LoadingSpinnerProps) {
    return (
        <div className={`${fixed? 'fixed' :'absolute'} left-[50%] top-[30%] translate-x-[-50%] translate-y-[50%] z-10`}>
            <MoonLoader
                className="flex justify-center mx-auto"
                size={size}
                aria-label="Loading Spinner"
            />
            <p className="mt-5">최신 목록을 불어오는 중입니다.</p>
        </div>
    )
}
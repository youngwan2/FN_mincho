import PulseSpinner from "../../../components/spinner/PulseSpinner";

export default function ChatLoadingSpinner({ isLoading }: { isLoading: boolean }) {
    return (
        <>
            {isLoading && (
                <div className="flex justify-center">
                    <div className="">
                        <PulseSpinner />
                    </div>
                </div>
            )}
        </>
    )
}
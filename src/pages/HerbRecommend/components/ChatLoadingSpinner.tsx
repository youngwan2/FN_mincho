import PulseSpinner from "../../../components/spinner/PulseSpinner";

export default function ChatLoadingSpinner({ isLoading }: { isLoading: boolean }) {
    return (
        <>
            {isLoading && (
                <div className="flex justify-center py-2">
                    <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                        <PulseSpinner />
                    </div>
                </div>
            )}
        </>
    )
}
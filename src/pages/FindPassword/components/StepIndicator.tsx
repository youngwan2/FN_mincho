interface StepIndicatorProps {
    step: number;
    stepCount?: number; // 총 단계 수, 기본값은 3
}

export default function StepIndicator({ step, stepCount = 3 }: StepIndicatorProps) {
    const progressPercent = stepCount > 1 ? ((step - 1) / (stepCount - 1)) * 100 : 0;

    return (
        <div className="mt-8 relative w-full max-w-md mx-auto">
            {/* 배경 바 */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 rounded-full -translate-y-1/2" />

            {/* 진행 바 */}
            <div
                className="absolute top-1/2 left-0 h-2 bg-primary-green rounded-full -translate-y-1/2 transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercent}%` }}
            />

            {/* 단계 점들 */}
            <div className="flex justify-between relative z-10">
                {Array.from({ length: stepCount }).map((_, index) => {
                    const current = index + 1;
                    const isActive = current <= step;

                    return (
                        <div
                            key={`step-${current}`}
                            className={`flex items-center justify-center h-18 w-18 rounded-full transition-colors duration-300 ${isActive ? 'bg-hover-primary-green text-white' : 'bg-gray-300 text-gray-700'
                                }`}
                        >
                            {current}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

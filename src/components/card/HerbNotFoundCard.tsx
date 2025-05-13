import React from 'react';

// 카드에 전달할 props 타입 정의
interface ErrorCardProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

const HerbNotFoundCard: React.FC<ErrorCardProps> = ({
    title = "데이터를 찾을 수 없습니다",
    message = "해당 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요.",
    icon,
    actionLabel = "새로고침",
    onAction
}) => {
    return (
        <div className="my-25 max-w-[512px] py-5 w-full mx-auto bg-transparent rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                    {icon ? (
                        icon
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
                <h3 className="text-2xl font-medium text-gray-900 text-center mb-2">{title}</h3>
                <p className="text-gray-500 text-center mb-6">{message}</p>
                {onAction && (
                    <div className="flex justify-center">
                        <button
                            onClick={onAction}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            {actionLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HerbNotFoundCard;
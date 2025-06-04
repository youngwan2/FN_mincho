interface QnaStatusBadgeProps {
    isPrivate: boolean;
    isAnswerAdopted: boolean;
}

export default function QnaStatusBadge({ isPrivate, isAnswerAdopted }: QnaStatusBadgeProps) {
    return (
        <div className="flex items-center gap-3 mb-2">
            {isPrivate && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xl font-medium">
                    비공개
                </span>
            )}
            {isAnswerAdopted ? (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xl font-medium">
                    해결됨
                </span>
            ) : (
                <span className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-xl font-medium">
                    미해결
                </span>
            )}
        </div>
    );
}

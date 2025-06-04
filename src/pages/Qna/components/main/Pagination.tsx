interface PaginationProps {
    page: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, handlePageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => page > 0 && handlePageChange(page)}
                    disabled={page <= 0}
                    className={`px-3 py-2 ${page <= 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
                >
                    이전
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // 현재 페이지 기준으로 표시할 페이지 번호 계산
                    let pageNum = page - 2 + i;
                    if (page < 2) pageNum = i;
                    if (page > totalPages - 3) pageNum = totalPages - 5 + i;
                    if (pageNum >= 0 && pageNum < totalPages) {
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum + 1)}
                                className={`w-10 h-10 rounded-lg font-medium ${page === pageNum
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {pageNum + 1}
                            </button>
                        );
                    }
                    return null;
                })}

                <button
                    onClick={() => page < totalPages - 1 && handlePageChange(page + 2)}
                    disabled={page >= totalPages - 1}
                    className={`px-3 py-2 ${page >= totalPages - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
                >
                    다음
                </button>
            </div>
        </div>
    );
};


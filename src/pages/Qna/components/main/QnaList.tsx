import QnaSkeleton from './QnaSkeleton';
import QnaListItem from './QnaListItem';
import { QnaSummary } from '@/types/qna.types';

interface QnaListProps {
    isLoading: boolean;
    items: QnaSummary[];
    handleQnaClick: (id: number) => void;
    handleCreateQna: () => void;
    handleTagClick?: (tag: string) => void;
}

export default function QnaList({ isLoading, items, handleQnaClick, handleCreateQna, handleTagClick }: QnaListProps) {
    return (
        <div className="space-y-4">
            {isLoading ? (
                <QnaSkeleton />
            ) : items.length > 0 ? (items.map((item: QnaSummary) => (
                <QnaListItem
                    key={item.id}
                    item={item}
                    onClick={handleQnaClick}
                    onTagClick={handleTagClick}
                />
            ))
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-16 text-center">
                    <p className="text-gray-600 text-2xl mb-4">등록된 QnA가 없습니다.</p>
                    <button
                        onClick={handleCreateQna}
                        className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        첫 질문 등록하기
                    </button>
                </div>
            )}
        </div>
    );
};


import { AnswerDetail } from '../../../../types/qna.types';
import AnswerItem from './AnswerItem';

interface AnswersListProps {
    answers: AnswerDetail[];
    isQuestionMine: boolean;
    isAnswerAdopted: boolean;
    onAdoptAnswer?: (answerId: number) => void;
    qnaId: string;  // qnaId 추가
}

export default function AnswersList({
    answers,
    isQuestionMine,
    isAnswerAdopted,
    onAdoptAnswer,
    qnaId
}: AnswersListProps) {
    // 채택된 답변을 먼저 보여줌
    const sortedAnswers = [...answers].sort((a, b) => {
        if (a.isAdopted) return -1; // 채택된 답변이 먼저 오도록
        if (b.isAdopted) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 그 외(a와 b 생성일 동일한 경우 포함)에는 최신순으로 정렬
    });

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">
                등록된 답변이 {answers.length}개 있습니다.
            </h3>

            {sortedAnswers.length > 0 ? (sortedAnswers.map(answer => (
                <AnswerItem
                    key={answer.id}
                    answer={answer}
                    onAdoptAnswer={onAdoptAnswer}
                    isQuestionMine={isQuestionMine}
                    isAnswerAdopted={isAnswerAdopted}
                    qnaId={qnaId}
                />
            ))
            ) : (
                <div className="bg-gray-50 rounded-lg border p-8 text-center">
                    <p className="text-gray-500 mb-3">아직 답변이 없습니다.</p>
                    <p className="text-gray-700">질문에 대한 답변을 작성해보세요!</p>
                </div>
            )}
        </div>
    );
};


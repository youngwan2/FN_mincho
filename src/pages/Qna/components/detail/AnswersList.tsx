import React from 'react';
import { AnswerDetail } from '../../../../types/qna.types';
import AnswerItem from './AnswerItem';

interface AnswersListProps {
    answers: AnswerDetail[];
    isQuestionMine: boolean;
    isAnswerAdopted: boolean;
    onAdoptAnswer?: (answerId: number) => void;
}

const AnswersList: React.FC<AnswersListProps> = ({
    answers,
    isQuestionMine,
    isAnswerAdopted,
    onAdoptAnswer
}) => {
    // 채택된 답변을 먼저 보여줌
    const sortedAnswers = [...answers].sort((a, b) => {
        if (a.isAdopted) return -1;
        if (b.isAdopted) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">
                답변 {answers.length}개
            </h3>

            {sortedAnswers.length > 0 ? (
                sortedAnswers.map(answer => (
                    <AnswerItem
                        key={answer.id}
                        answer={answer}
                        onAdoptAnswer={onAdoptAnswer}
                        isQuestionMine={isQuestionMine}
                        isAnswerAdopted={isAnswerAdopted}
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

export default AnswersList;

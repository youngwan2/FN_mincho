import { useParams, useNavigate } from "react-router";
import { useQnaDetailGetQuery } from "../../hooks/queries/useQueryQna";
import { useDeleteQnaMutation } from "../../hooks/mutations/useMutationQna";
import { useAdoptAnswerMutation } from "../../hooks/mutations/useMutationAnswer";
import {
    QnaHeader,
    QnaStatusBadge,
    QnaMetaInfo,
    QnaContent,
    QnaImageGallery,
    AnswersList,
    AnswerForm
} from "./components/detail";

export default function QnaDetailPage() {
    const { qnaId } = useParams<{ qnaId: string }>();
    const navigate = useNavigate();

    // QnA 상세 정보 조회
    const { qna, isLoading, isError } = useQnaDetailGetQuery(Number(qnaId));

    // 현재 사용자가 이 QnA의 작성자인지 확인
    const isQuestionMine = qna?.isMine || false;    // 답변이 이미 채택되었는지 여부 확인
    const isAnswerAdopted = qna?.answers?.some(answer => answer.isAdopted) || false;


    // 답변 채택 mutation
    const adoptAnswerMutation = useAdoptAnswerMutation(Number(qnaId));

    // QnA 삭제 mutation
    const deleteQnaMutation = useDeleteQnaMutation();    // 날짜 포맷팅 함수는 QnaMetaInfo 컴포넌트로 이동했습니다    // 답변 등록 핸들러


    // 답변 채택 핸들러
    const handleAdoptAnswer = (answerId: number) => {
        // 답변 채택은 질문 작성자만 가능
        if (isQuestionMine) {
            adoptAnswerMutation.mutate(answerId);
        }
    };

    // QnA 삭제 핸들러
    const handleDeleteQna = () => {
        if (window.confirm('정말 이 질문을 삭제하시겠습니까?')) {
            deleteQnaMutation.mutate(Number(qnaId), {
                onSuccess: () => {
                    navigate('/community/qna');
                }
            });
        }
    };

    // 로딩 중 표시
    if (isLoading) {
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-[1000px] w-full mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/6 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="h-32 bg-gray-200 rounded mb-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    // 에러 표시
    if (isError || !qna) {
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-[1000px] w-full mx-auto">
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                        <h2 className="text-red-600 text-xl font-bold mb-2">오류가 발생했습니다</h2>
                        <p>데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.</p>
                        <button
                            onClick={() => navigate('/community/qnas')}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            목록으로 돌아가기
                        </button>
                    </div>
                </div>
            </div>
        );
    } return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1200px] w-full mx-auto">
                {/* 뒤로가기 및 액션 버튼 */}
                <QnaHeader
                    qnaId={qnaId as string}
                    isQuestionMine={isQuestionMine}
                    onDelete={handleDeleteQna}
                />

                {/* QnA 제목 및 상태 */}
                <div className="mb-6">
                    <QnaStatusBadge
                        isPrivate={qna.isPrivate}
                        isAnswerAdopted={isAnswerAdopted}
                    />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{qna.title}</h1>
                </div>

                {/* 작성자 정보 및 조회수 */}
                <QnaMetaInfo
                    writer={qna.writer}
                    createdAt={qna.createdAt}
                    views={qna.view || 0}
                />

                {/* 질문 내용 */}
                <QnaContent content={qna.content} />                {/* 이미지 첨부 */}
                <QnaImageGallery
                    images={qna.imageUrls || []}
                    title="첨부 이미지"
                />{/* 구분선 */}
                <hr className="my-8" />

                {/* 답변 작성 폼 (상단에 배치) */}
                <AnswerForm
                    qnaId={qnaId as string}
                />                {/* 답변 목록 */}
                <AnswersList
                    answers={qna.answers || []}
                    isQuestionMine={isQuestionMine}
                    isAnswerAdopted={isAnswerAdopted}
                    onAdoptAnswer={handleAdoptAnswer}
                    qnaId={qnaId as string}
                />
            </div>
        </div>
    );
}
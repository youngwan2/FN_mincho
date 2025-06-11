import { useParams, useNavigate } from "react-router";
import { useQnaDetailGetQuery } from "../../hooks/queries/useQueryQna";
import { useDeleteQnaMutation } from "../../hooks/mutations/useMutationQna";
import { useAdoptAnswerMutation } from "../../hooks/mutations/useMutationAnswer";
import { useQnaPageStore } from '@/store/store';
import {
    QnaHeader,
    QnaStatusBadge,
    QnaMetaInfo,
    QnaContent,
    AnswersList,
    AnswerForm
} from "./components/detail";
import useScrollTo from "@/hooks/useScrollTo";

export default function QnaDetailPage() {

    const { qnaId } = useParams<{ qnaId: string }>();
    const navigate = useNavigate();


    useScrollTo();

    // QnA 상세 정보 조회
    const { qna, isLoading, isError } = useQnaDetailGetQuery(Number(qnaId));

    // 현재 사용자가 이 QnA의 작성자인지 확인
    const isQuestionMine = qna?.isMine || false;    // 답변이 이미 채택되었는지 여부 확인
    const isAnswerAdopted = qna?.answers?.some(answer => answer.isAdopted) || false;


    // 답변 채택 mutation
    const adoptAnswerMutation = useAdoptAnswerMutation(Number(qnaId));

    // QnA 삭제 mutation
    const deleteQnaMutation = useDeleteQnaMutation();    // 날짜 포맷팅 함수는 QnaMetaInfo 컴포넌트로 이동했습니다   


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
                    navigate('/community/qnas');
                }
            });
        }
    };

    // 태그 클릭 핸들러
    const { setSearchCondition, setPage } = useQnaPageStore();
    const handleTagClick = (tag: string) => {
        setSearchCondition({ tag });
        setPage(0);
        navigate('/community/qnas');
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
                        <h2 className="text-red-600 text-3xl font-bold mb-2">오류가 발생했습니다</h2>
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
        <section className="min-h-screen p-6">
            <div className="max-w-[1200px] w-full mx-auto">
                {/* 뒤로가기 및 액션 버튼 */}
                <QnaHeader
                    qnaId={qnaId as string}
                    isQuestionMine={isQuestionMine}
                    onDelete={handleDeleteQna}
                />

                {qna.isPrivate && !qna.isMine
                    ? (
                        <div className="bg-green-50 border border-green-200 p-8 rounded-lg mb-6 text-center">
                            <p className="text-green-800 text-2xl">
                                이 질문은 비공개로 설정되어 있습니다. 작성자만 내용을 볼 수 있습니다.
                            </p>
                        </div>
                    )
                    : (
                        <>
                            {/* 작성자 정보 및 조회수 */}
                            < QnaMetaInfo
                                writer={qna.writer}
                                writerId={qna.writerId}
                                avatarUrl={qna.avatarUrl}
                                createdAt={qna.createdAt}
                                views={qna.view || 0}
                            />

                            {/* QnA 제목 및 상태 */}
                            <div className="mb-6">
                                <QnaStatusBadge
                                    isPrivate={qna.isPrivate}
                                    isAnswerAdopted={isAnswerAdopted}
                                />
                                <h1 className="text-5xl font-bold text-gray-700 mb-4 mt-5">{qna.title}</h1>


                            </div>

                            {/* 질문 내용 */}
                            <QnaContent content={qna.content} imageUrls={qna.imageUrls || []} />


                            {/* 태그 목록 */}
                            {qna.tags && qna.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {qna.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gradient-to-r from-[#e8f5e9] to-[#e3f2fd] text-gray-700 px-3 py-1.5 rounded-full text-2xl flex items-center border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                            onClick={() => handleTagClick(tag)}
                                        >
                                            <span className="text-[#05D182] mr-1">#</span>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* 구분선 */}
                            <hr className="my-8" />

                            {/* 답변 작성 폼 (상단에 배치) */}
                            <AnswerForm
                                isQuestionMine={isQuestionMine}
                                qnaId={qnaId as string}
                            />

                            {/* 답변 목록 */}
                            <AnswersList
                                answers={qna.answers || []}
                                isQuestionMine={isQuestionMine}
                                isAnswerAdopted={isAnswerAdopted}
                                onAdoptAnswer={handleAdoptAnswer}
                                qnaId={qnaId as string}
                            />


                        </>
                    )}
            </div>
        </section>
    );
}
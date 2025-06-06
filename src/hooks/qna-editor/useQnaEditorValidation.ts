import { showToast } from '../../components/toast/CustomToast';
import { QnaEditorState, EditorType } from './types';

export function useQnaEditorValidation(state: QnaEditorState, type: EditorType) {
    const { title, content, category } = state;

    // 폼 유효성 검사 (UI 표시용, 제출 버튼 활성화/비활성화)
    const isFormValid = () => {
        if (!content.trim() || content.length < 10) return false;

        if (type === 'question' || type === 'edit-question') {
            return title.trim() !== '' && category !== '';
        }

        return true;
    };

    // 폼 유효성 검사 함수 (제출 전 검사, 에러 메시지 표시)
    const validateForm = () => {
        // 기본 유효성 검사
        if (!content.trim()) {
            showToast.error("내용을 입력해주세요.");
            return false;
        }

        if (content.length < 10) {
            showToast.error("내용은 최소 10자 이상 입력해주세요.");
            return false;
        }

        // 질문 작성 시 제목과 카테고리 필수
        if ((type === 'question' || type === 'edit-question') && !title.trim()) {
            showToast.error("제목을 입력해주세요.");
            return false;
        }

        if ((type === 'question' || type === 'edit-question') && !category) {
            showToast.error("카테고리를 선택해주세요.");
            return false;
        }

        return true;
    };

    return {
        isFormValid,
        validateForm
    };
}

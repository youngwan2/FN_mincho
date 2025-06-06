import { QnaEditorState } from './types';

export function useQnaEditorHandlers(state: QnaEditorState) {
    const { setContent } = state;

    // 컨텐츠 업데이트 핸들러
    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    return {
        handleContentChange
    };
}

/**
 * @deprecated 이 파일은 더 이상 사용하지 않습니다. 대신 'hooks/qna-editor' 모듈을 직접 사용하세요.
 */
import { useQnaEditor } from './qna-editor';
import type { EditorType, UseQnaEditorProps, UseQnaEditorReturn } from './qna-editor/types';

// 기존 코드와의 호환성을 위한 재내보내기
export { useQnaEditor };
export type { EditorType, UseQnaEditorProps, UseQnaEditorReturn };

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
    content?: string;
    isDetail: boolean;
    onChange: (html: string) => void;
}

export default function QuillEditor({ content, isDetail, onChange }: QuillEditorProps) {
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: isDetail ? false : [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
            ]
        },
        readOnly: isDetail,
        theme: "snow",
        placeholder: "여러분의 지식을 공유해보세요!",
    });

    useEffect(() => {
        if (quill) {
            // 초기 내용 설정
            if (content) {
                const delta = quill.clipboard.convert({ html: content });
                quill.setContents(delta);
            }

            // 내용 변경 핸들링
            if (!isDetail) {
                quill.on('text-change', () => {
                    onChange(quillRef.current?.firstChild?.innerHTML || "");
                });
            }

            // 읽기/쓰기 전환
            quill.enable(!isDetail);
        }
    }, [quill, content, isDetail]);

    return (
        <div className={`${isDetail ? 'h-auto pt-4' : 'border h-auto border-gray-300'}`}>
            <div ref={quillRef} className="w-full" />
        </div>
    );
}

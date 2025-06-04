import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface AnswerFormProps {
    qnaId: string;
    onSubmit: (content: string, images: string[]) => void;
    isPending: boolean;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ qnaId, onSubmit, isPending }) => {
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        onSubmit(content, images);
        setContent('');
        setImages([]);
    };

    // 이미지 업로드 핸들러 (실제 구현은 프로젝트 이미지 업로드 방식에 맞게 수정 필요)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 실제 프로젝트의 이미지 업로드 로직으로 구현
        // 예시: 이미지 URL을 images 배열에 추가하는 형태
        const files = e.target.files;
        if (!files) return;

        // 예시 코드 (실제 구현은 파일 업로드 로직에 따라 수정 필요)
        // const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        // setImages(prev => [...prev, ...newImages]);
    };

    return (
        <div className="mt-8 bg-white rounded-lg border p-6">
            <h3 className="text-2xl font-bold mb-4">답변 작성</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="답변을 작성해주세요..."
                        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                        disabled={isPending}
                    />
                </div>

                {/* 이미지 첨부 영역 */}
                <div className="mb-4">
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isPending}
                    />
                    <label
                        htmlFor="images"
                        className="inline-block px-4 py-2 border rounded cursor-pointer hover:bg-gray-100"
                    >
                        이미지 첨부
                    </label>

                    {images.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative w-16 h-16">
                                    <img src={img} alt="첨부" className="w-16 h-16 object-cover rounded" />
                                    <button
                                        type="button"
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:bg-gray-400"
                        disabled={isPending || !content.trim()}
                    >
                        <FiSend />
                        답변 등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AnswerForm;

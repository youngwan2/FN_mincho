import { FiEye } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

interface QnaMetaInfoProps {
    writer: string;
    createdAt: string;
    views: number;
}

export default function QnaMetaInfo({ writer, createdAt, views }: QnaMetaInfoProps) {
    // 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        try {
            return format(parseISO(dateString), 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div className="flex items-center" >
                <div>
                    <p className="font-medium">{writer}</p>
                    <p className="text-xl text-gray-500">{formatDate(createdAt)}</p>
                </div>
            </div>
            <div className="flex items-center text-gray-500">
                <FiEye className="mr-1" />
                <span>{views || 0}</span>
            </div>
        </div>
    );
}

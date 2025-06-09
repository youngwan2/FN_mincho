import { FiEye } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import noProfileImage from "@/assets/noImage.png";
import { Link } from "react-router";
import CustomTimeAgo from "@/components/vender/timeago/CustomTimeAgo";

interface QnaMetaInfoProps {
    avatarUrl?: string; // 작성자 아바타 URL (선택적)
    writer: string;
    writerId: number;
    createdAt: string;
    views: number;
}

export default function QnaMetaInfo({ writer, writerId, avatarUrl, createdAt, views }: QnaMetaInfoProps) {
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
        <div className="flex justify-between items-center mb-6 pb-4 ">
            <Link to={`/users/${writerId}`} className="flex items-center" >
                <img className="w-18 h-18 rounded-full mr-3.5" src={`${avatarUrl || noProfileImage}`} alt="유저 프로필 이미지" onError={(e) => e.currentTarget.src = noProfileImage} />
                <div>
                    <p className="font-semibold">{writer}</p>
                    <p className="text-gray-500 text-xl"><CustomTimeAgo date={createdAt} /></p>
                </div>
            </Link>
            <div className="flex items-center text-gray-500">
                <FiEye className="mr-1" />
                <span>{views || 0}</span>
            </div>
        </div>
    );
}

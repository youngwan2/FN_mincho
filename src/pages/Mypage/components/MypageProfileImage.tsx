import { FormEvent, useRef, useState } from "react";
import noImage from '../../../assets/noImage.png'
import { showToast } from "../../../components/toast/CustomToast";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { updateProfileImage } from "@/service/profile.service";

interface MypageProfileImageProps {
    profileImage?: string;
}

const MAX_PROFILE_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

export default function MypageProfileImage({ profileImage }: MypageProfileImageProps) {
    const [previewImage, setPreviewImage] = useState<string | undefined>(profileImage);
    const [_, setFile] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imgRef = useRef<HTMLImageElement>(null)

    // 파일 선택 시 미리보기 설정
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > MAX_PROFILE_IMAGE_SIZE) {
            showToast.error("파일 사이즈는 1MB를 넘을 수 없습니다.")
            return
        }

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            if (imgRef.current) {
                imgRef.current.src = imageUrl
            }
            setPreviewImage(imageUrl)
            showToast.info("미리보기 이미지가 설정되었습니다.")
        }
    };

    // 파일 업로드 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);

        const image = formData.get("image") as File;

        if (image && image.size > 0) {
            console.log("파일 이름:", image.name)

            const success = await updateProfileImage(formData);

            if (success) {
                showToast.success("프로필 이미지가 등록되었습니다!")
            } else {
                showToast.success("알 수 없는 문제로 프로필 이미지 등록에 실패하였습니다. 나중에 다시시도 해주세요.")
            }

        } else {
            console.log("파일 없음")
            return
        }
    }

    // 프로필 영역 클릭 시 파일 선택창 열기
    const handleProfileClick = () => {
        fileInputRef.current?.click();
    };

    // 업로드 취소
    const handleCancel = () => {

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
            setPreviewImage(undefined)
            setFile('')
        }


    }

    return (
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <div
                className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden cursor-pointer"
                onClick={handleProfileClick}
            >
                <img
                    ref={imgRef}
                    src={profileImage || previewImage || noImage}
                    onError={(e) => {
                        e.currentTarget.src = noImage;
                    }}
                    alt="프로필 이미지"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 실제 파일 업로드 input (숨겨진 상태) */}
            <input
                type="file"
                accept="image/*"
                name="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* 선택된 파일이 있을 경우 표시 */}
            {previewImage && (
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => {
                            const confirmDelete = window.confirm("이미지를 삭제하시겠습니까?");
                            if (confirmDelete) {
                                handleCancel();
                                showToast.info("이미지가 삭제되었습니다.");
                            }
                        }}
                        type="button"
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-gary-700 border border-gray-300 bg-white transition-colors duration-200 text-xl hover:bg-gray-100 cursor-pointer"
                    >
                        <FaTrash className="text-gray-700" />
                        삭제
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-white bg-gray-700 hover:bg-hover-primary-green transition-colors duration-200 text-xl cursor-pointer"
                    >
                        <FaCheckCircle />
                        등록
                    </button>
                </div>
            )}

        </form>
    );
}

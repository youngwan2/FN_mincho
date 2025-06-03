import { useRef } from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";


interface CommentDropdownProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    onDelete: (commentId: number) => void
    onEdit: () => void
    commentId: number
}
export default function CommentDropdown({ isOpen, setIsOpen, onDelete, onEdit, commentId }: CommentDropdownProps) {
    const dropdownRef = useRef(null);

    // 댓글 수정 폼 활성화
    const handleEditFormToggle = () => {
        onEdit()
        setIsOpen(false);
    };

    // 댓글 삭제
    const handleDeleteClick = () => {
        const isDelete = window.confirm("정말 삭제하시겠습니까?")
        if (isDelete) {
            onDelete(commentId)
        }
    };


    return (
        <div className="relative" ref={dropdownRef}>
            {isOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-sm border border-gray-200  z-10">
                    <div className="py-1">
                        <button
                            onClick={handleEditFormToggle}
                            className="flex items-center w-full px-4 py-2 cursor-pointer text-xl text-gray-700 hover:bg-gray-100"
                        >
                            <IoCreateOutline size={16} className="mr-2" />
                            <span>수정</span>
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="flex items-center w-full px-4 py-2 text-xl cursor-pointer text-red-600 hover:bg-gray-100"
                        >
                            <IoTrashOutline size={16} className="mr-2" />
                            <span>삭제</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
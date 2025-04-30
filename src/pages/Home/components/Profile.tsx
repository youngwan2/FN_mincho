import { useRef, useState } from "react"
import { type Profile } from "../../../types/user.types"
import DropdownMenu from "./DropdownMenu";
import { useProfileGetQuery } from "../../../hooks/queries/useQueryProfile";
import noProfile from '../../../assets/noImage.png'

export default function Profile() {

    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isToggle, setIsToggle] = useState(false)


    const { profileInfo } = useProfileGetQuery()


    function handleDropdown() {
        setIsToggle(prev => !prev)
    }


    return (
        <div onClick={handleDropdown} className="bg-gray-200 cursor-pointer flex relative border rounded-full w-[40px] h-[40px]  border-primary-dark-gray">
            <img
                src={profileInfo.avatarUrl || noProfile}
                alt="프로필 이미지"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = noProfile;
                }}
                className="rounded-full mr-1 w-[40px] h-[40px] object-contain"
                width={40}
                height={40} />

            <DropdownMenu ref={dropdownRef} isToggle={isToggle} />
        </div>
    )
}
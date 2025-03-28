import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { type Profile } from "../../../types/user.types"
import DropdownMenu from "./DropdownMenu";
import { useProfileGetQuery } from "../../../hooks/queries/useQueryProfile";

export default function Profile() {

    const [isToggle, setIsToggle] = useState(false)


    const { profileInfo } = useProfileGetQuery()


    function handleDropdown() {
        setIsToggle(prev => !prev)
    }

    return (
        <div className="flex relative border rounded-2xl py-3 px-2 border-primary-dark-gray bg-[rgba(255,255,255,0.8)]">
            <img
                src={profileInfo.avatarUrl || "https://picsum.photos/800/600"}
                alt="프로필 이미지"
                className="rounded-full mr-1"
                width={30}
                height={30} />
            <div className="flex ml-2">
                <p>{profileInfo?.nickname || ''}</p>
                <button onClick={handleDropdown} className="mx-2 cursor-pointer text-gray-700"><IoIosArrowDown className={`${isToggle ? " rotate-180" : "rotate-0"} transition-transform`} /></button>
            </div>

            {
                isToggle ? <DropdownMenu /> : null
            }
        </div>
    )
}
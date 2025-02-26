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
        <div className="flex relative">
            <img
                src={profileInfo.avatarUrl || "https://picsum.photos/800/600"}
                alt="프로필 이미지"
                className="rounded-2xl mr-1"
                width={35}
                height={35} />
            <div className="flex">
                <p>{profileInfo?.nickname || ''}</p>
                <button onClick={handleDropdown} className="mx-1 cursor-pointer text-gray-700"><IoIosArrowDown className={`${isToggle ? " rotate-180" : "rotate-0"} transition-transform`} /></button>
            </div>

            {
                isToggle ? <DropdownMenu /> : null
            }
        </div>
    )
}
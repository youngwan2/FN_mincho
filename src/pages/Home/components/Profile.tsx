import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { getInitialProfile } from "../../../service/user"
import { type Profile } from "../../../types/user.types"
import DropdownMenu from "./DropdownMenu";

export default function Profile() {

    const [profile, setProfile] = useState<Profile>()
    const [isToggle, setIsToggle] = useState(false)

    useEffect(() => {
        getProfile();


    }, [])

    async function getProfile() {
        const initialProfile = await getInitialProfile()
        setProfile(initialProfile)
    }

    function handleDropdown() {
        setIsToggle(prev => !prev)
        console.log(isToggle)
    }




    return (
        <div className="flex">
            <img
                src="https://picsum.photos/800/600"
                alt="프로필 이미지"
                className="rounded-2xl mr-1"
                width={35}
                height={35} />
            <div className="flex">
                <p>{profile?.nickname || '익명'}</p>
                <button onClick={handleDropdown} className="mx-1 cursor-pointer text-gray-700"><IoIosArrowDown className={`${isToggle ? " rotate-180" : "rotate-0"} transition-transform`} /></button>
            </div>

            {
                isToggle ? <DropdownMenu /> : null
            }
        </div>
    )
}
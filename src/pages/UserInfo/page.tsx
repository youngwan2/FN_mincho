import UserProfile from "./components/UserInfo";
import useScrollTo from "@/hooks/useScrollTo";

export default function UserInfoPage() {

    useScrollTo();


    return (
        <section className=" px-4 md:px-10 lg:px-12 pb-10">
            <UserProfile />
        </section>
    )
}
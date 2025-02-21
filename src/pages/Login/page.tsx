import useRedirection from "../../hooks/useRedirection";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {

    useRedirection();

    return (
        <div className="md:h-[90vh] md:flex-row items-center flex-col-reverse h-auto flex p-[20px] max-w-[1240px] w-full bg-white rounded-3xl">
            <LoginForm />
            {/* 이미지 섹션 */}
            <div className="md:w-[50%] md:h-full md:block hidden ">
                <img className="w-full h-full rounded-2xl" src="https://picsum.photos/500/700"></img>
            </div>
        </div>
    )
}
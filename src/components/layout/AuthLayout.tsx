import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";


export default function AuthLayout() {
    return (
        <div className="w-full max-w-full h-[100vh] bg-[#14c480] flex items-center justify-center font-prentendard">
            <ToastContainer />
            <Outlet />
        </div>
    )
}
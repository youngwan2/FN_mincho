import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";


export default function AuthLayout() {
    return (
        <div className="w-full max-w-full h-[100vh] bg-[#05D182] flex items-center justify-center"> 
            <ToastContainer/>
            <Outlet/>
        </div>
    )
}
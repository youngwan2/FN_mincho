
import { ReactElement } from 'react'
import { IoCheckmark, IoClose, IoInformation, IoWarning } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 커스텀 토스트 컴포넌트
const CustomToast = ({ message, icon }:{message:string, icon:ReactElement}) => {
    return (
        <div className="flex items-center">
            <div className="mr-3">{icon}</div>
            <div className="font-medium">{message}</div>
        </div>
    );
};

// 토스트 알림 함수
export const showToast = {
    success: (message: string) => {
        toast.success(
            <CustomToast
                message={message}
                icon={<IoCheckmark className='text-green-600' size={20}/>}
            />,
            {
                className: "bg-green-50 border-l-4 border-green-500 text-green-800",
            }
        );
    },

    error: (message:string) => {
        toast.error(
            <CustomToast
                message={message}
                icon={<IoClose className="text-red-500" size={20} />}
            />,
            {
                className: "bg-red-50 border-l-4 border-red-500 text-red-800",
            }
        );
    },

    info: (message:string) => {
        toast.info(
            <CustomToast
                message={message}
                icon={<IoInformation className="text-blue-500" size={20} />}
            />,
            {
                className: "bg-blue-50 border-l-4 border-blue-500 text-blue-800",
            }
        );
    },

    warning: (message:string) => {
        toast.warning(
            <CustomToast
                message={message}
                icon={<IoWarning className="text-yellow-500" size={20} />}
            />,
            {
                className: "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800",
            }
        );
    },
};

// 메인 ToastContainer 컴포넌트
export const CustomToastContainer = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="rounded-md shadow-md z-[10000000000000000]"
        />
    );
};
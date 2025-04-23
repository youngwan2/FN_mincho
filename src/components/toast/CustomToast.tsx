
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 커스텀 토스트 컴포넌트
const CustomToast = ({ message}:{message:string}) => {
    return (
        <div className="flex items-center">
            <div className="">{message}</div>
        </div>
    );
};

// 토스트 알림 함수
export const showToast = {
    success: (message: string) => {
        toast.success(
            <CustomToast
                message={message}
            />,
            {
                className: "bg-green-50  text-green-800",
            }
        );
    },

    error: (message:string) => {
        toast.error(
            <CustomToast
                message={message}
            />,
            {
                className: "bg-red-50 text-red-800",
            }
        );
    },

    info: (message:string) => {
        toast.info(
            <CustomToast
                message={message}
            />,
            {
                className: "bg-blue-50  text-blue-800",
            }
        );
    },

    warning: (message:string) => {
        toast.warning(
            <CustomToast
                message={message}
            />,
            {
                className: "bg-yellow-50 text-yellow-800",
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
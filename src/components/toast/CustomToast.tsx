import { toast, ToastContainer, ToastContentProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSeedling, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { GiHerbsBundle } from 'react-icons/gi';
import { Link } from 'react-router';

// 약초 커뮤니티 테마 색상
const HERBAL_COLORS = {
    success: {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        border: "border-emerald-200",
        icon: "text-emerald-600"
    },
    error: {
        bg: "bg-rose-50",
        text: "text-rose-800",
        border: "border-rose-200",
        icon: "text-rose-600"
    },
    info: {
        bg: "bg-teal-50",
        text: "text-teal-800",
        border: "border-teal-200",
        icon: "text-teal-600"
    },
    warning: {
        bg: "bg-amber-50",
        text: "text-amber-800",
        border: "border-amber-200",
        icon: "text-amber-600"
    }
};

// 허브 아이콘 SVG (커스텀 SVG)
const HerbIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C7.58 2 4 5.58 4 10C4 14.42 7.58 18 12 18C16.42 18 20 14.42 20 10C20 5.58 16.42 2 12 2Z" fill="currentColor" fillOpacity="0.3" />
        <path d="M12 6C12 6 10 8 10 10C10 12 12 14 12 14C12 14 14 12 14 10C14 8 12 6 12 6Z" fill="currentColor" />
        <path d="M12 14V22M8 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// 약초잎 아이콘 SVG (커스텀 SVG)
const LeafIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 21C6 17 5 13 2 10C5 9 9 8 12 12C15 16 15 21 15 21H6Z" fill="currentColor" />
        <path d="M17 14C17 14 14 12 13 7C12 2 13 2 16 2C19 2 22 5 22 9C22 13 21 17 17 20V14Z" fill="currentColor" fillOpacity="0.5" />
        <path d="M12 12C8 7 2 6 2 6C2 11 6 16 12 21C18 16 22 11 22 6C22 6 16 7 12 12Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
);

// 커스텀 토스트 컴포넌트
const CustomToast = ({ message, type }: { message: string; type: 'success' | 'error' | 'info' | 'warning' }) => {
    const IconComponent = () => {
        switch (type) {
            case 'success':
                return <GiHerbsBundle className={`w-5 h-5 ${HERBAL_COLORS.success.icon}`} />;
            case 'error':
                return <FaTimesCircle className={`w-5 h-5 ${HERBAL_COLORS.error.icon}`} />;
            case 'info':
                return <HerbIcon />;
            case 'warning':
                return <FaExclamationTriangle className={`w-5 h-5 ${HERBAL_COLORS.warning.icon}`} />;
            default:
                return <FaSeedling className={`w-5 h-5 ${HERBAL_COLORS.success.icon}`} />;
        }
    };

    return (
        <div className="flex items-center space-x-3 p-1">
            <div className={type === 'info' ? HERBAL_COLORS.info.icon : ''}>
                <IconComponent />
            </div>
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
                type="success"
            />,
            {
                className: `${HERBAL_COLORS.success.bg} ${HERBAL_COLORS.success.text} border-l-4 ${HERBAL_COLORS.success.border}`,
            }
        );
    },

    error: (message: string) => {
        toast.error(
            <CustomToast
                message={message}
                type="error"
            />,
            {
                className: `${HERBAL_COLORS.error.bg} ${HERBAL_COLORS.error.text} border-l-4 ${HERBAL_COLORS.error.border}`,
            }
        );
    },

    info: (message: string) => {
        toast.info(
            <CustomToast
                message={message}
                type="info"
            />,
            {
                className: `${HERBAL_COLORS.info.bg} ${HERBAL_COLORS.info.text} border-l-4 ${HERBAL_COLORS.info.border}`,
            }
        );
    },

    warning: (message: string) => {
        toast.warning(
            <CustomToast
                message={message}
                type="warning"
            />,
            {
                className: `${HERBAL_COLORS.warning.bg} ${HERBAL_COLORS.warning.text} border-l-4 ${HERBAL_COLORS.warning.border}`,
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
            toastClassName="rounded-md shadow-md z-50 border-l-4 relative overflow-hidden"
            icon={false}
            closeButton={CloseButton}
        />
    );
};

// 커스텀 닫기 버튼
const CloseButton = ({ closeToast }: { closeToast: () => void }) => (
    <button onClick={closeToast} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <LeafIcon />
    </button>
);



// 메시지 수신
export const receivedMessage = (link: string, title: string, content: string) => {
    toast((closeToast) => SplitButtons(closeToast, link, title, content), {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        className: 'p-0 w-[400px] border border-gray-200',
        ariaLabel: 'Message received',
        hideProgressBar: true
    })
}


function SplitButtons({ closeToast }: ToastContentProps, link: string, title: string, content: string) {
    return (
        <div className="grid grid-cols-[1fr_1px_80px] w-full">
            <div className="flex flex-col p-4">
                <h3 className="text-zinc-800 text-3xl font-semibold">{title || '메시지 알림'}</h3>
                <p className="text-2xl pt-3">{content || '메시지가 도착 하였습니다. 확인 하시겠나요?'}</p>
            </div>
            <div className="bg-zinc-900/20 h-full" />
            <div className="grid grid-rows-[1fr_1px_1fr] h-full">
                <Link
                    to={link}
                    onClick={closeToast}
                    className="block text-primary-green  cursor-pointer w-full text-center">
                    이동
                </Link>
                <div className="bg-zinc-900/20 w-full" />
                <button className='cursor-pointer' onClick={closeToast}>닫기</button>
            </div>
        </div>
    );
}
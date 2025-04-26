import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSeedling, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { GiHerbsBundle } from 'react-icons/gi';

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

// 토스트 팝업에 사용할 약초 모티브 배경 SVG 컴포넌트
const HerbBackgroundSVG = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-2 bottom-2 opacity-10">
        <path d="M20 5C18 5 16 7 16 9C16 11 18 15 20 15C22 15 24 11 24 9C24 7 22 5 20 5Z" fill="currentColor" />
        <path d="M20 15V25M16 20H24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M10 10C8 10 6 12 6 14C6 16 8 20 10 20C12 20 14 16 14 14C14 12 12 10 10 10Z" fill="currentColor" fillOpacity="0.6" />
        <path d="M10 20V30M6 25H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M30 15C28 15 26 17 26 19C26 21 28 25 30 25C32 25 34 21 34 19C34 17 32 15 30 15Z" fill="currentColor" fillOpacity="0.6" />
        <path d="M30 25V35M26 30H34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
);

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
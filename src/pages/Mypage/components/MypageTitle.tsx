

import { FaUser, FaChartBar, FaClipboardList, FaCog } from 'react-icons/fa';
import { GiHerbsBundle } from 'react-icons/gi';

interface MyPageTitleProps {
    text: string;
    icon?: 'profile' | 'analytics' | 'contents' | 'settings' | 'herb';
}

export default function MypageTitle({ text, icon }: MyPageTitleProps) {
    const getIcon = () => {
        switch (icon) {
            case 'profile':
                return <FaUser className="text-[#05D182] mr-2" />;
            case 'analytics':
                return <FaChartBar className="text-[#05D182] mr-2" />;
            case 'contents':
                return <FaClipboardList className="text-[#05D182] mr-2" />;
            case 'settings':
                return <FaCog className="text-[#05D182] mr-2" />;
            case 'herb':
                return <GiHerbsBundle className="text-[#05D182] mr-2" />;
            default:
                return null;
        }
    };

    return (
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            {icon && getIcon()}
            {text}
        </h2>
    );
}
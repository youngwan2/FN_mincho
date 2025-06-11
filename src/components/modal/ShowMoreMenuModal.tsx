import { logout } from '@/service/auth.service';
import { Content, Overlay, Portal, } from '@radix-ui/react-dialog';
import {
    FiHelpCircle,
    FiMail,
    FiBriefcase,
    FiSettings,
    FiUser,
    FiMessageSquare,
} from 'react-icons/fi';
import { useNavigate } from 'react-router';



export default function ShowMoreMenuModal() {
    const navigate = useNavigate();
    const handleItemClick = (path: string) => {
        navigate(path)
    };

    return (
        <Portal>
            <Overlay className="fixed inset-0 bg-black/50 animate-fade z-[1001]" />
            <Content className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto animate-accordion-down z-[1002]">
                <div className="flex-1 p-2">
                    <Section>
                        <p className='font-semibold p-2 font-prentendard' >주요메뉴</p>
                        <MenuItem
                            icon={<FiHelpCircle className='h-6 w-6' />}
                            label="Q&A"
                            onClick={() => handleItemClick('/community/qnas')}
                        />
                        <MenuItem
                            icon={<FiMail className='h-6 w-6' />}
                            label="지식"
                            onClick={() => {
                                alert("지식은 현재 준비중입니다.")
                                return
                                handleItemClick('/community/knowledge')
                            }}
                        />
                        <MenuItem
                            icon={<FiBriefcase className='h-6 w-6' />}
                            label="커뮤니티"
                            onClick={() => handleItemClick('/community/posts')}
                        />
                        <MenuItem
                            icon={<FiSettings className='h-6 w-6' />}
                            label="이벤트"
                            onClick={() => {
                                alert("이벤트는 현재 준비중입니다.")
                                return
                                handleItemClick('/event')
                            }}
                        />
                    </Section>

                    <Section>
                        <p className='font-semibold p-2 font-prentendard' >소개/문의</p>
                        <div className='flex items-center gap-3 pl-3 py-4 text-gray-800 text-2xl hover:bg-gray-50 cursor-default'>
                            <FiHelpCircle className='h-6 w-6' />
                            <a className=' cursor-default' href='https://forms.gle/ApM2zdG9nonzdiSn7' target='_blank'>문의하기</a>
                        </div>

                    </Section>

                    <Section>
                        <p className='font-semibold p-2 font-prentendard' >내 계정</p>
                        <MenuItem
                            icon={<FiUser className='h-6 w-6' />}
                            label="프로필"
                            onClick={() => handleItemClick('/users/me')}
                        />

                    </Section>


                    <Section>
                        <p className='font-semibold p-2 font-prentendard' >로그아웃</p>
                        <MenuItem
                            icon={<FiMessageSquare className='h-6 w-6' />}
                            label="로그아웃"
                            onClick={() => logout()}
                        />
                    </Section>
                </div>

            </Content>
        </Portal>
    );
};


interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    badge?: string;
    onClick?: () => void;
}

function MenuItem({ icon, label, badge, onClick }: MenuItemProps) {
    return (
        <button
            className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <span className="text-gray-600 text-lg">{icon}</span>
                <span className="text-gray-800 font-medium">{label}</span>
            </div>
            {badge && (
                <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {badge}
                </span>
            )}
        </button>
    )
};

interface SectionProps {
    title?: string;
    children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            {title && (
                <div className="px-4 py-3 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {title}
                    </h3>
                </div>
            )}
            <div>{children}</div>
        </div>
    )
};
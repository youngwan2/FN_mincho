import HomePage from '@/pages/Home/page';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Helmet } from 'react-helmet-async';

// 코드 스플릿: 페이지 컴포넌트 동적 임포트
const RootLayout = lazy(() => import('../components/layout/RootLayout'));
const LoginPage = lazy(() => import('../pages/Login/page'));
const AuthLayout = lazy(() => import('../components/layout/AuthLayout'));
const RegisterPage = lazy(() => import('../pages/Register/page'));
const FindPasswordPage = lazy(() => import('../pages/FindPassword/page'));
const HerbPage = lazy(() => import('../pages/Herb/page'));
const HerbDetailPage = lazy(() => import('../pages/Herb/detail-page'));
const Mypage = lazy(() => import('../pages/Mypage/page'));
const CommunityPage = lazy(() => import('../pages/Community/main-page'));
const ErrorMessageCard = lazy(() => import('../components/card/ErrorMessageCard'));
const CommunityDetailPage = lazy(() => import('../pages/Community/detail-page'));
const CommunityEditorPage = lazy(() => import('../pages/Community/write-page'));
const HerbRecommendPage = lazy(() => import('../pages/HerbRecommend/page'));
const OAuthSuccessPage = lazy(() => import('../pages/OAuthSuccess/page'));
const UserInfoPage = lazy(() => import('../pages/UserInfo/page'));
const PageNotFoundCard = lazy(() => import('../components/card/PageNotFoundCard'));
const QnAPage = lazy(() => import('../pages/Qna/main-page'));
const QnaDetailPage = lazy(() => import('../pages/Qna/detail-page'));
const QnaWritePage = lazy(() => import('../pages/Qna/write-page'));
const QnaEditPage = lazy(() => import('../pages/Qna/edit-page'));
const LegalPage = lazy(() => import('../pages/Legal/page'));
const FAQPage = lazy(() => import('../pages/FAQ/page'));
const ContactPage = lazy(() => import('../pages/Contact/page'));

function HomePageWithHelmet() {
    return (
        <>
            <Helmet>
                <title>민초 | 우리의 약초</title>
                <meta name="description" content="민초 - 우리의 약초, 약초 정보와 커뮤니티" />
            </Helmet>
            <HomePage />
        </>
    );
}


function withHelmet<T extends object>(Component: React.ComponentType<T>, title: string, description: string) {
    return function HelmetedComponent(props: T) {
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                </Helmet>
                <Component {...props} />
            </>
        );
    };
}

const LoginPageWithHelmet = withHelmet(LoginPage, '로그인 | 민초', '민초 로그인 페이지');
const RegisterPageWithHelmet = withHelmet(RegisterPage, '회원가입 | 민초', '민초 회원가입 페이지');
const FindPasswordPageWithHelmet = withHelmet(FindPasswordPage, '비밀번호 찾기 | 민초', '민초 비밀번호 찾기');
const HerbPageWithHelmet = withHelmet(HerbPage, '약초도감 | 민초', '민초 약초도감');
const HerbDetailPageWithHelmet = withHelmet(HerbDetailPage, '약초 상세 | 민초', '민초 약초 상세 정보');
const MypageWithHelmet = withHelmet(Mypage, '마이페이지 | 민초', '민초 마이페이지');
const CommunityPageWithHelmet = withHelmet(CommunityPage, '커뮤니티 | 민초', '민초 커뮤니티');
const CommunityDetailPageWithHelmet = withHelmet(CommunityDetailPage, '커뮤니티 상세 | 민초', '민초 커뮤니티 상세');
const CommunityEditorPageWithHelmet = withHelmet(CommunityEditorPage, '글쓰기 | 민초', '민초 커뮤니티 글쓰기');
const HerbRecommendPageWithHelmet = withHelmet(HerbRecommendPage, '맞춤 추천 | 민초', '민초 맞춤 약초 추천');
const OAuthSuccessPageWithHelmet = withHelmet(OAuthSuccessPage, 'OAuth 성공 | 민초', '민초 OAuth 인증 성공');
const UserInfoPageWithHelmet = withHelmet(UserInfoPage, '내 정보 | 민초', '민초 내 정보');
const QnAPageWithHelmet = withHelmet(QnAPage, 'Q&A | 민초', '민초 Q&A');
const QnaDetailPageWithHelmet = withHelmet(QnaDetailPage, 'Q&A 상세 | 민초', '민초 Q&A 상세');
const QnaWritePageWithHelmet = withHelmet(QnaWritePage, 'Q&A 작성 | 민초', '민초 Q&A 작성');
const QnaEditPageWithHelmet = withHelmet(QnaEditPage, 'Q&A 수정 | 민초', '민초 Q&A 수정');
const LegalPageWithHelmet = withHelmet(LegalPage, '법적 문서 | 민초', '민초 법적 문서');
const FAQPageWithHelmet = withHelmet(FAQPage, 'FAQ | 민초', '민초 FAQ');
const ContactPageWithHelmet = withHelmet(ContactPage, '문의 | 민초', '민초 문의 페이지');
const PageNotFoundCardWithHelmet = withHelmet(PageNotFoundCard, '404 | 민초', '페이지를 찾을 수 없습니다.');

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorMessageCard />,
        children: [
            { index: true, element: <HomePageWithHelmet /> },
            { path: '/auth/oauth-success', element: <OAuthSuccessPageWithHelmet /> },
            { path: 'herbs', element: <HerbPageWithHelmet /> },
            { path: 'herbs/:herbId', element: <HerbDetailPageWithHelmet /> },
            { path: 'chat/herbs-recommend', element: <HerbRecommendPageWithHelmet /> },
            { path: 'users/me', element: <MypageWithHelmet /> },
            {
                path: 'community',
                children: [
                    { path: 'posts', element: <CommunityPageWithHelmet /> },
                    { path: 'post/write', element: <CommunityEditorPageWithHelmet /> },
                    { path: 'qnas', element: <QnAPageWithHelmet /> },
                    { path: 'qna/write', element: <QnaWritePageWithHelmet /> },
                    { path: 'qnas/:qnaId/edit', element: <QnaEditPageWithHelmet /> },
                ],
            },
            { path: 'community/posts/:postId', element: <CommunityDetailPageWithHelmet /> },
            { path: 'community/qnas/:qnaId', element: <QnaDetailPageWithHelmet /> },
            { path: 'users/:userId', element: <UserInfoPageWithHelmet /> },
            { path: 'legal', element: <LegalPageWithHelmet /> },
            { path: 'faq', element: <FAQPageWithHelmet /> },
            { path: 'contact', element: <ContactPageWithHelmet /> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        errorElement: <ErrorMessageCard />,
        children: [
            { path: 'login', element: <LoginPageWithHelmet /> },
            { path: 'signup', element: <RegisterPageWithHelmet /> },
            { path: 'find-password', element: <FindPasswordPageWithHelmet /> },
        ],
    },
    { path: '*', element: <PageNotFoundCardWithHelmet /> },
];

import HomePage from '@/pages/Home/page';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';

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

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorMessageCard />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/auth/oauth-success', element: <OAuthSuccessPage /> },
            { path: 'herbs', element: <HerbPage /> },
            { path: 'herbs/:herbId', element: <HerbDetailPage /> },
            { path: 'chat/herbs-recommend', element: <HerbRecommendPage /> },
            { path: 'users/me', element: <Mypage /> },
            {
                path: 'community',
                children: [
                    { path: 'posts', element: <CommunityPage /> },
                    { path: 'post/write', element: <CommunityEditorPage /> },
                    { path: 'qnas', element: <QnAPage /> },
                    { path: 'qna/write', element: <QnaWritePage /> },
                    { path: 'qnas/:qnaId/edit', element: <QnaEditPage /> },
                ],
            },
            { path: 'community/posts/:postId', element: <CommunityDetailPage /> },
            { path: 'community/qnas/:qnaId', element: <QnaDetailPage /> },
            { path: 'users/:userId', element: <UserInfoPage /> },
            { path: 'legal', element: <LegalPage /> },
            { path: 'faq', element: <FAQPage /> },
            { path: 'contact', element: <ContactPage /> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        errorElement: <ErrorMessageCard />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'signup', element: <RegisterPage /> },
            { path: 'find-password', element: <FindPasswordPage /> },
        ],
    },
    { path: '*', element: <PageNotFoundCard /> },
];

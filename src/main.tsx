import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '../src/assets/styles/fonts.css'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'

// 레이아웃
import RootLayout from './components/layout/RootLayout'
import AuthLayout from './components/layout/AuthLayout'
import ErrorMessageCard from './components/card/ErrorMessageCard'

// 페이지 Lazy 로드
const HomePage = lazy(() => import('./pages/Home/page'))
const LoginPage = lazy(() => import('./pages/Login/page'))
const RegisterPage = lazy(() => import('./pages/Register/page'))
const FindPasswordPage = lazy(() => import('./pages/FindPassword/page'))
const HerbPage = lazy(() => import('./pages/Herb/page'))
const HerbDetailPage = lazy(() => import('./pages/HerbDetail/page'))
const Mypage = lazy(() => import('./pages/Mypage/page'))
const CommunityPage = lazy(() => import('./pages/Community/page'))
const CommunityDetailPage = lazy(() => import('./pages/CommunityDetail/page'))
const CommunityEditorPage = lazy(() => import('./pages/CommunityEditor/page'))
const HerbRecommendPage = lazy(() => import('./pages/HerbRecommend/page'))
const OAuthSuccessPage = lazy(() => import('./pages/OAuthSuccess/page'))


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
          <Routes>
            <Route path="/" element={<RootLayout />} errorElement={<ErrorMessageCard />}>
              <Route index element={<HomePage />} />
              <Route path="/auth/oauth-success" element={<OAuthSuccessPage />} />
              <Route path="herbs" element={<HerbPage />} />
              <Route path="herbs/:herbId" element={<HerbDetailPage />} />
              <Route path="chat/herbs-recommend" element={<HerbRecommendPage />} />
              <Route path="users/me" element={<Mypage />} />
              <Route path="community">
                <Route index element={<CommunityPage />} />
                <Route path="write" element={<CommunityEditorPage />} />
              </Route>
              <Route path="community/:postId" element={<CommunityDetailPage />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />} errorElement={<ErrorMessageCard />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<RegisterPage />} />
              <Route path="find-password" element={<FindPasswordPage />} />
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)

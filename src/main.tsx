import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '../src/assets/styles/fonts.css'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'
import { Route } from 'react-router';
import { Routes } from 'react-router';
import HomePage from './pages/Home/page';
import RootLayout from './components/layout/RootLayout';
import LoginPage from './pages/Login/page';
import AuthLayout from './components/layout/AuthLayout';
import RegisterPage from './pages/Register/page';
import FindPasswordPage from './pages/FindPassword/page';
import HerbPage from './pages/Herb/page';
import HerbDetailPage from './pages/Herb/detail-page';
import Mypage from './pages/Mypage/page';
import CommunityPage from './pages/Community/main-page';
import ErrorMessageCard from './components/card/ErrorMessageCard';
import CommunityDetailPage from './pages/Community/detail-page';
import CommunityEditorPage from './pages/Community/write-page';
import HerbRecommendPage from './pages/HerbRecommend/page';
import OAuthSuccessPage from './pages/OAuthSuccess/page';
import UserInfoPage from './pages/UserInfo/page';
import PageNotFoundCard from './components/card/PageNotFoundCard';
import QnAPage from './pages/Qna/main-page';
import QnaDetailPage from './pages/Qna/detail-page';
import QnaWritePage from './pages/Qna/write-page';
import QnaEditPage from './pages/Qna/edit-page';
import LegalPage from './pages/Legal/page';
import FAQPage from './pages/FAQ/page';
import ContactPage from './pages/Contact/page';


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
        <Routes>          <Route path='/' element={<RootLayout />} errorElement={<ErrorMessageCard />}>
          <Route index element={<HomePage />} />
          <Route path='/auth/oauth-success' element={<OAuthSuccessPage />} ></Route>
          <Route path="herbs" element={<HerbPage />} />
          <Route path="herbs/:herbId" element={<HerbDetailPage />} />
          <Route path="chat/herbs-recommend" element={<HerbRecommendPage />}></Route>
          <Route path="users/me" element={<Mypage />} />
          <Route path="community">
            <Route path='posts' element={<CommunityPage />} />
            <Route path='post/write' element={<CommunityEditorPage />} />
            <Route path='qnas' element={<QnAPage />} />
            <Route path='qna/write' element={<QnaWritePage />} />
            <Route path='qnas/:qnaId/edit' element={<QnaEditPage />} />
          </Route>          <Route path='community/posts/:postId' element={<CommunityDetailPage />} />
          <Route path='community/qnas/:qnaId' element={<QnaDetailPage />} />
          <Route path='users/:userId' element={<UserInfoPage />} />
          <Route path='legal' element={<LegalPage />} />
          <Route path='faq' element={<FAQPage />} />
          <Route path='contact' element={<ContactPage />} />
        </Route>

          <Route path='/auth' element={<AuthLayout />} errorElement={<ErrorMessageCard />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<RegisterPage />} />
            <Route path="find-password" element={<FindPasswordPage />} />
          </Route>
          <Route path='*' element={<PageNotFoundCard />}></Route>
        </Routes>

      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)

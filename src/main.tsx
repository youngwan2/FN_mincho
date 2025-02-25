import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '../src/assets/styles/fonts.css'
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
import HerbDetailPage from './pages/HerbDetail/page';


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
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="herbs" element={<HerbPage />} />
            <Route path="herbs/:herbId" element={<HerbDetailPage />} />
          </Route>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<RegisterPage />} />
            <Route path="find-password" element={<FindPasswordPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)

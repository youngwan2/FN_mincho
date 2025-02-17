import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import '../src/assets/styles/fonts.css'
import './index.css'
import { Route } from 'react-router';
import { Routes } from 'react-router';
import HomePage from './pages/Home/page';
import RootLayout from './components/layout/RootLayout';
import LoginPage from './pages/Login/page';
import AuthLayout from './components/layout/AuthLayout';
import RegisterPage from './pages/Register/page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

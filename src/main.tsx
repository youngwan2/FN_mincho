import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import '../src/assets/styles/fonts.css'
import './index.css'
import { Route } from 'react-router';
import { Routes } from 'react-router';
import HomePage from './pages/Home/page';
import RootLayout from './components/layout/RootLayout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

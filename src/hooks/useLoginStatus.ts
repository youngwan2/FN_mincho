import { useEffect, useState } from 'react';
import { getLoginStatus } from '../service/user';

export default function useAuth() {

        const [isLogin, setIsLogin] = useState(false)

        async function handleLoginStatus() {
                const login = await getLoginStatus();
                setIsLogin(login)
        }

        // 리렌더링 부분 1
        useEffect(() => {
                handleLoginStatus();
        }, [])

        return isLogin;
}
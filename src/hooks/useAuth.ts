import { useEffect, useState } from 'react';
import { getLoginStatus } from '@/service/user.service';
import { removeToken } from '@/utils/storage';

export default function useAuth() {

        const [isLogin, setIsLogin] = useState(false)

        async function getAuthStatus() {
                const loginStatus = await getLoginStatus();
                setIsLogin(loginStatus);

                if (!loginStatus) {
                        removeToken();

                }
        }

        // 리렌더링 부분
        useEffect(() => {
                getAuthStatus();
        }, [])

        return isLogin;
}
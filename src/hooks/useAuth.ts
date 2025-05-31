import { useEffect, useState } from 'react';
import { getToken } from '../utils/storage'

export default function useAuth() {

        const [isLogin, setIsLogin] = useState(true)

        // 리렌더링 부분
        useEffect(() => {
                const localToken = getToken();
                if (localToken) { return setIsLogin(true) }
                setIsLogin(false)
        }, [isLogin])

        return isLogin;
}
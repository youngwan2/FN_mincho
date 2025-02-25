import { useEffect, useState } from 'react';
import { getToken } from '../utils/storage'

export default function useAuth() {

        const [isLogin, setIsLogin] = useState(false)

        useEffect(() => {
                const localToken = getToken();
                if (localToken) return setIsLogin(true)
                setIsLogin(false)
        }, [])

        return isLogin;
}
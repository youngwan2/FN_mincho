import { useEffect } from "react";
import { getToken } from "../utils/storage";
import { useLocation, useNavigate } from "react-router";


export default function useRedirection() {
    const router = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = getToken();

        // 비로그인 상태라면 로그인 페이지로
        if (!token && location.pathname !== "/auth/signup") {
            router("/auth/login")
        }

        // 로그인 상태라면 루트  페이지로
        if (token) {
            router("/")
        }
    }, [])
}
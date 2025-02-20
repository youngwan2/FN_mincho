import { useEffect } from "react";
import { getToken } from "../utils/storage";
import { useNavigate } from "react-router";


export default function useRedirection() {
    const router = useNavigate();

    useEffect(() => {
        const token = getToken();

        // 비로그인 상태라면 로그인 페이지로
        if (!token) {
            router("/auth/login")
        }

        // 로그인 상태라면 루트  페이지로
        if (token) {
            router("/")
        }
    }, [])
}
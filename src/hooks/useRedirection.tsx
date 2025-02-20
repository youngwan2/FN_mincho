import { useEffect } from "react";
import { getToken } from "../utils/storage";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


export default function useAuth() {
    const router = useNavigate();

    useEffect(() => {
        const token = getToken();

        // 비로그인 상태라면 로그인 페이지로
        if (!token) {
            toast.info("로그인 후 이용해주세요.")
            router("/auth/login")
        }

        // 로그인 상태라면 루트  페이지로
        if (token) {
            router("/")
        }
    }, [])
}
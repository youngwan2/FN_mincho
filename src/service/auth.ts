import { emailCheckFetch, getProfileFetch, loginFetch, registerFetch } from "../apis/auth";
import { Email, LoginRequest, RegisterRequest } from "../types/auth.types";
import { setToken } from "../utils/storage";



/**
 * 회원가입 요청
 * @param registerRequest 
 */
export const register = async (registerRequest: RegisterRequest) => {
    return await registerFetch(registerRequest)
}


/** 이메일 중복 체크 */
export const emailCheck = async (email: Email) => {
    return await emailCheckFetch(email)
}



/**
 * 로그인 요청
 * @param loginRequest 
 * @returns 
 */
export const login = async (loginRequest: LoginRequest) => {
    const response = await loginFetch(loginRequest)

    const rawToken = response?.headers['authorization'] as string
    setToken(rawToken.split(" ")[1])
}

/** 프로필 정보 요청*/
export const getInitialProfile = async () => {
    const data = await getProfileFetch();

    return data
}
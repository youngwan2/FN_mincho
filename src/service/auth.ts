import { emailCheckFetch, loginFetch, logoutFetch, registerFetch, sendVerificationCodeFetch, verificationCodeCheckFetch } from "../apis/auth";
import { Email, LoginRequest, RegisterRequest } from "../types/auth.types";
import { removeToken, setToken } from "../utils/storage";



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

/** 로그아웃 요청 */
export const logout = async () => {

    const data = await logoutFetch()
    if (Number(data.status) == 200) {
        location.reload() // 새로고침
    }
    removeToken(); // 액세스 토큰 제거
}

/**  이메일 인증번호 발송 */
export const sendVerificationCode = async (email: string) => {
    const success = await sendVerificationCodeFetch(email);
    return success
}

/** 이메일 인증번호 검증 */
export const verificationCodeCheck = async (email: string, code: string) => {
    const success = await verificationCodeCheckFetch(email, code)
    return success
}

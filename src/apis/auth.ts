import { AxiosError } from "axios"
import { apiRoutes } from "../config/api"
import instance from "../config/axios"
import { Email, LoginRequest, RegisterRequest } from "../types/auth.types"
import { toast } from "react-toastify"


/** 회원가입 요청*/
export const registerFetch = async (registerRequest: RegisterRequest) => {

    const body = {
        email: registerRequest.email,
        password: registerRequest.password
    }

    try {
        const response = await instance.post(
            apiRoutes.auth.register,
            JSON.stringify(body)
        )

        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.status + ":" + error.response?.data.message)

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")

        }
    }
}

/** 이메일 중복 확인 */
export const emailCheckFetch = async (email: Email) => {

    const body = JSON.stringify(email)

    try {
        await instance.post(apiRoutes.auth.checkEmail, body);
        return true;

    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.status + ":" + error.response?.data.message)

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")

        }

        return false
    }
}


/** 로그인 요청 */
export const loginFetch = async (loginRequest: LoginRequest) => {
    const body = {
        email: loginRequest.email,
        password: loginRequest.password
    }

    try {
        const response = await instance.post(
            apiRoutes.auth.login,
            JSON.stringify(body)
        )

        if (response?.status && response.status > 399) {
            throw new AxiosError("로그인에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.status + ":" + error.response?.data.message)
            return error.response

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")

        }
    }
}

/** 이메일 인증 번호 전송 요청 */
export const sendVerificationCodeFetch = async (email: string) => {
    try {
        const response = await instance.post(
            apiRoutes.auth.sendVerificationCode,
            {
                email: email
            }
        )

        if (response?.status && response.status > 399) {
            throw new AxiosError("이메일 인증번호 발송에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return true
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.status + ":" + error.response?.data.message)

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")
        }
        return false
    }

}


/** 이메일 인증번호 검증 요청 */
export const verificationCodeCheckFetch = async (email: string, code: string) => {
    try {
        const response = await instance.post(
            apiRoutes.auth.checkVerificationCode,
            {
                email,
                code
            }
        )

        if (response?.status && response.status > 399) {
            throw new AxiosError("이메일 인증에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return true
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.status + ":" + error.response?.data.message)

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")
        }

        return false
    }

}

/** 로그아웃 요청 */
export const logoutFetch = async () => {

    try {
        const response = await instance.delete(
            apiRoutes.auth.logout,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                }
            }
        )

        if (response?.status && response.status > 399) {
            toast.error(response.status + ": 로그아웃에 실패하였습니다.")
            throw new AxiosError("로그아웃에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error("에러: " + error.response?.data.message)
            return error.response

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")


        }
    }
}

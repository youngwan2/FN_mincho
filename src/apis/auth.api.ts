import { AxiosError } from "axios"
import { apiRoutes } from "../config/api"
import instance from "../config/axios"
import { Email, LoginRequest, RegisterRequest } from "../types/auth.types"
import { showToast } from "../components/toast/CustomToast"


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
            showToast.error(error.response?.data.message)

        } else {
            showToast.error("서버 측 문제로 요청에 실패하였습니다.")

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
            showToast.error(error.response?.data.message)

        } else {
            showToast.error("서버 측 문제로 요청에 실패하였습니다.")

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
            showToast.error(error.response?.data.message)
            return error.response

        } else {
            showToast.error("서버 측 문제로 요청에 실패하였습니다.")

        }
    }
}

/** 이메일 인증 번호 전송 요청 */
export const sendVerificationCodeFetch = async (email: string, type: 'register' | 'reset') => {
    try {
        const response = await instance.post(
            apiRoutes.auth.sendVerificationCode(type),
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
            if (error.status === 400) {
                if (typeof error.response?.data.message === 'string') {
                    showToast.error(error.response?.data.message)
                } else {
                    showToast.error("잘못된 요청입니다. 이메일 형식을 확인 후 다시시도 해주세요.")
                }
            }


        } else {
            showToast.error("서버 측 문제로 요청에 실패하였습니다.")
        }
        return false
    }

}


/** 이메일 인증번호 검증 요청 */
export const verificationCodeCheckFetch = async (email: string, code: string, type: 'register' | 'reset') => {
    try {
        const response = await instance.post(
            apiRoutes.auth.checkVerificationCode(type),
            {
                email,
                code,
            }
        )

        if (response?.status && response.status > 399) {
            throw new AxiosError("이메일 인증에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return true
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.status === 400) {
                if (typeof error.response?.data.message === 'string') {
                    showToast.error(error.response?.data.message)
                } else {
                    showToast.error("잘못된 요청입니다. 인증번호 형식을 확인 후 다시시도 해주세요.")
                }
            }

        } else {
            showToast.error("서버 측 문제로 요청에 실패하였습니다.")
        }

        return false
    }

}

/** 로그아웃 요청 */
export const logoutFetch = async () => {

    try {
        const response = await instance.delete(
            apiRoutes.auth.logout,
        )

        if (response?.status && response.status > 399) {
            showToast.error("로그아웃에 실패하였습니다.")
            throw new AxiosError("로그아웃에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            showToast.error(error.response?.data.message)
            return error.response

        } else {
            showToast.error("서버 측 문제로 요청에 실패하였습니다.")


        }
    }
}

/** 회원탈퇴 요청 */
export const deleteUserFetch = async (url: string) => {
    return await instance.delete(url)
}
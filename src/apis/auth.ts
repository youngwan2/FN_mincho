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
            toast.error("에러: " + error.response?.data.message)

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
            console.log("에러: " + error.response?.data.message)

            return false
        }

        if (error instanceof Error) {
            alert("500: 네트워크 문제로 요청에 실패하였습니다.")
            return false
        }
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
            toast.error(response.status + ": 로그인에 실패하였습니다.")
            throw new AxiosError("로그인에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error("에러: " + error.response?.data.message)
            return error.response

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")


        }
    }
}



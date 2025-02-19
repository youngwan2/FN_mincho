import { emailCheckFetch, registerFetch } from "../apis/auth";
import { Email, RegisterRequest } from "../types/auth.types";



/**
 * 회원가입 요청
 * @param registerRequest 
 */
export const register = async ( registerRequest:RegisterRequest) => {
    return await registerFetch(registerRequest)
}


export const emailCheck = async (email:Email)=>{
    return await emailCheckFetch(email)
}

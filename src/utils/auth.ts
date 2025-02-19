

const AUTH_REGEX = {
    EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
}

/**
 * 사용자 입력값 유효성 검사
 * @param value 사용자 입력값
 * @param type 검증할 타겟의 타입
 * @returns 
 */
export const validator = (value: string, type: 'EMAIL' | 'PASSWORD') => {
    const regex = new RegExp(AUTH_REGEX[type])
    return regex.test(value)
}

export const passwordConfirmValidator = (password: string, passwordConfirm: string) => {
    return password === passwordConfirm
}
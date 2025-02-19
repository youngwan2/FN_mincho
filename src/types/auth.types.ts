

type ValidateMessages = {
    email?: string
    password?: string
    passwordConfirm?: string
}

export interface RegisterRequest {
    email: string
    password: string
    passwordConfirm?: string,
    messages?: ValidateMessages
}

export type Email = {
    email: string
}


type ValidateMessages = {
    email?: string
    password?: string
    passwordConfirm?: string
}

export interface RegisterRequest {
    email: string
    password: string
    passwordConfirm?: string
    messages?: ValidateMessages
    essentialInfoConsent: boolean
    optionalInfoConsent: boolean
    automaticInfoConsent: boolean
    marketingConsent: boolean
}

export type Email = {
    email: string
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UpdatePasswordRequest {
    currentPassword: string
    newPassword: string
}
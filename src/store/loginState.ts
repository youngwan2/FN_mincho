import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserAuthState, UserState } from './types/login.types'

/**
 * 사용자 프로필 상태를 관리하는 Zustand 스토어입니다.
 */
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profile: {
                avatarUrl: '',
                introduction: '',
                nickname: '',
                isSocial: false
            },
            setUserState: (newProfile) => set(
                {
                    profile: newProfile
                })
            //  setPosition: (position) => set({ position }),
        }),
        { name: 'user-state' },
    ),

)

/**
 * 사용자 인증 상태를 관리하는 Zustand 스토어입니다.
 */
export const useAuth = create<UserAuthState>()(
    persist(
        (set) => ({
            isLogin: false,
            setLoginState: (isLogin) => set({
                isLogin
            })
        }),
        { name: 'auth-state' },
    ),
)
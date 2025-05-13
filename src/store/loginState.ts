import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserState } from './types/login.types'

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
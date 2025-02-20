

import { Profile } from '../../types/user.types';

export interface UserState {
    profile: Profile
    setUserState: (userState: Profile) => void

}




/**
interface User {
  id: string;
  email: string;
  name: string;
  // 필요한 다른 사용자 정보들
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) => {
        set({ user, token, isLoggedIn: true });
        // API 헤더에 토큰 설정
        setAuthHeader(token);
      },

      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
        // API 헤더에서 토큰 제거
        removeAuthHeader();
        // 필요한 경우 로컬 스토리지 클리어
        localStorage.clear();
      },

      updateUser: (updateData) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updateData } : null,
        })),
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn 
      }), // 저장할 상태 선택
    }
  )
);

export default useAuthStore;
 * 
 * 
 * 
 * 
 */
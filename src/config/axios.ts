import axios from "axios";
import { baseUrl } from "./api";
import { getToken, removeToken, setToken } from "../utils/storage";

// axios 인스턴스를 만들 때 구성 기본 값 설정
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// 요청 인터셉터
instance.interceptors.request.use(function (request) {
  request.headers['Authorization'] = getToken();

  return request;
})

// 응답 인터셉터
instance.interceptors.response.use(function (response) {

  const rawToken = response.headers['authorization'] as string

  if (!rawToken) return response;

  setToken(rawToken.split(" ")[1])

  return response;

}, function (error) {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행

  if (error.status === 401) {
    // 토큰 제거
    removeToken()
  }

  if (error.status === 403) {
  }

  return Promise.reject(error);
});


export default instance;


import axios from "axios";
import { baseUrl } from "./api";
import { getToken } from "../utils/storage";

// axios 인스턴스를 만들 때 구성 기본 값 설정
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// 인스턴스가 생성 된 후 기본값 변경
instance.defaults.headers.common['Authorization'] = getToken();

export default instance;

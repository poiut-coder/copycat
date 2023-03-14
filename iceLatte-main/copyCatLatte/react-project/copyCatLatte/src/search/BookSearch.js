 /* eslint-disable */
import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: "KakaoAK e6e0c044accaacc796bb686beef66a0b" // 공통으로 요청 할 헤더
  }
});

// search Book api
export const BookSearch = params => {
  return Kakao.get("/v3/search/book", { params });
};
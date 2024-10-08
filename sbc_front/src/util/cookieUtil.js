import {Cookies} from "react-cookie";

const cookies = new Cookies();

// 쿠키 설정 (로그인) "member"라는 name으로 저장함
export const setCookie = (name, value, days) => {
    const expires = new Date()
    expires.setUTCDate(expires.getUTCDate() + days); // 보관 기한
    return cookies.set(name, value, {path:'/', expires:expires})
}

export const getCookie = (name) => {
    return cookies.get(name)
}

export const removeCookie = (name, path="/") => {
    cookies.remove(name, {path})
}


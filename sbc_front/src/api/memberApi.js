import axios from "axios";

const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api/auth`

// 로그인(POST) 요청
export const loginPost = async (loginParam) => {
    const header = {
        headers : {'Content-Type': 'x-www-form-urlencoded'}
    }
    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.pw)

    const result = await axios.post(`${host}/login`, form, header)

    console.log(result);

    return result.data;
}


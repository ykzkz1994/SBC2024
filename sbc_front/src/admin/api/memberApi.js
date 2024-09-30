import axios from "axios"

// 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/admin/member`

export const getList = async () => {
    const res = await axios.get(`${prefix}/totalList`)

    console.log(res.data)

    return res.data
}
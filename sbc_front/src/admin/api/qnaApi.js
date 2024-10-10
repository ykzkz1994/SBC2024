import axios from "axios"

// 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/admin/qnas`

// getList : 페이지 처리를 위해서 사용
export const getList = async (pageParam) => {
    const {page,size} = pageParam
    const res = await axios.get(`${prefix}/list`, {params: {page:page, size:size}})

    console.log(res.data)

    return res.data
}

export const getCommentList = async () => {
    const res = await axios.get(`${prefix}/comments/list`)

    console.log(res.data)

    return res.data
}
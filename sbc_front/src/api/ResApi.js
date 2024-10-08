import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080"

const prefix = `${API_SERVER_HOST}/api/res`

export const getSiteList = async () => {
    const res = await axios.get(`${prefix}/siteList`)

    return res.data
}
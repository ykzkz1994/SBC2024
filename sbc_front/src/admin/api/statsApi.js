import axios from "axios"

// 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/admin/stats`

// 매출 현황 : 금액 가져오기, 예약 건수
export const fetchSalesStats = async (params) => {
    try {
        const response = await axios.get(`${prefix}/reservation-sales/sales`, { params });
        return response.data;
    } catch (error) {
        console.error('API request error:', error.response?.data || error.message);
        throw error;
    }
};

// 예약 취소 현황 : 취소 건수, 취소 금액
export const fetchCancelStats = async (params) => {
    console.log('Fetching cancel stats with params:', params);
    try {
        const response = await axios.get(`${prefix}/reservation-sales/cancel`, { params });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API request error:', error.response?.data || error.message);
        throw error;
    }
}

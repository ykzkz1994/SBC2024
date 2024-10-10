import axios from "axios";/*백엔드와 통신하기위해 import*/

//예약관리 모듈의 기능을 모아둔 APi

//백엔드의 경로를 상수로 할당
const backUrl= "http://localhost:8080";   //백엔드 기본경로 변수에 할당

//백엔드 경로와 매핑명을 합쳐서
export const resHost = `${backUrl}/admin/res`

// 기본 Axios 인스턴스 설정 (필요 시)
const axiosInstance = axios.create({
    baseURL: resHost,      //url경로
    timeout: 10000, // 타임아웃 설정
    headers: { 'Content-Type': 'application/json' },    //제이슨형식
});

// 모든 사이트 데이터를 가져오는 함수
export const getResDataAll = async () => {
    try {
        const response = await axiosInstance.get('/all');//모든 res 데이터를 axiosInstace로 get방식으로 가져옴
        // 필요한 경우, 데이터 가공이나 필터링을 여기서 수행할 수 있습니다.
        return response.data; // 모든 사이트 데이터 반환
    } catch (error) {

        console.error("모든 예약 데이터를 가져오는 중 오류 발생 프론트,getResDataAll 함수:", error);
        throw error;
    }
};





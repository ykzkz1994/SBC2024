import BasicLayout from '../layouts/BasicLayout';
import '../css/mainPage.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import ResCalendar from "../components/res/ResCalendar";
import useCustomLogin from "../../hooks/useCustomLogin";
import Carousel from "react-bootstrap/Carousel";
import {fetchCustomerStats, fetchSalesStats} from "../api/statsApi";

const MainPage = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const { isLogin } = useCustomLogin();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [debugInfo, setDebugInfo] = useState({});
    const [currentTime, setCurrentTime] = useState('');
    const [totalReservationStats, setTotalReservationStats] = useState({ totalReservations: 0, averageReservationsPerDay: 0 });
    const [rebookingRate, setRebookingRate] = useState(0);
    const [searchParams, setSearchParams] = useState({
        dateType: 'month', // 기본값을 'month'로 설정
        startDate: '', // 초기값 비워두기
        endDate: '',
        siteId: null
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [salesData, setSalesData] = useState({
        statsList: [], // 기본 값을 빈 배열로 설정
        totalStats: {}
    });

    const processData = (data) => {
        console.log('Received data:', data);

        if (data.overallStats) {

            // totalReservationStats 수정
            setTotalReservationStats({
                totalReservations: data.totalCustomers || 0,
                averageReservationsPerDay: data.totalCustomers ? (data.totalCustomers / 30) : 0
            });

            // 다른 데이터 처리는 그대로 유지
            if (data.rebookingRate !== undefined) {
                setRebookingRate(data.rebookingRate);
            }
        }
    };

    useEffect(() => {
        // 현재 월의 시작일과 마지막일 계산
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // 날짜 형식을 'YYYY-MM-DD'로 변환
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // 초기 검색 파라미터 설정
        const initialSearchParams = {
            dateType: 'month',
            startDate: formatDate(firstDayOfMonth),
            endDate: formatDate(lastDayOfMonth),
            siteId: null
        };

        console.log('Initial search params:', initialSearchParams); // 디버깅용
        onSearch(initialSearchParams);
    }, []);

// onSearch 함수 수정
    const onSearch = async (newSearchParams) => {
        setSearchParams(newSearchParams);
        setLoading(true);
        try {
            console.log('Searching with params:', newSearchParams); // 디버깅용
            const data = await fetchCustomerStats(newSearchParams);

            // fetchSalesStats 호출 시 파라미터 전달 방식 수정
            const findSalesData = await fetchSalesStats({
                startDate: newSearchParams.startDate,
                endDate: newSearchParams.endDate,
                dateType: newSearchParams.dateType,
                siteId: newSearchParams.siteId
            });

            processData(data);
            setSalesData(findSalesData);
        } catch (err) {
            console.error('Error in onSearch:', err); // 디버깅용
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        console.log("Current login state:", loginState);
        console.log("Is logged in:", isLogin);

        setDebugInfo({
            isLogin,
            memberRole: loginState.member?.memberRole,
            loginStateDetails: JSON.stringify(loginState, null, 2)
        });

        if (isLogin) {
            if (loginState.member?.memberRole === "ROLE_ADMIN") {
                setIsLoading(false);
                console.log("Admin access granted");
            } else {
                console.log("Redirecting to home: Not an admin");
                navigate('/');
            }
        } else {
            console.log("Not logged in, redirecting to login page");
            const timer = setTimeout(() => {
                navigate('/login');
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isLogin, loginState, navigate]);

    // 실시간 보이기
    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleString());
        };

        updateCurrentTime(); // 처음 렌더링 시 바로 시간 업데이트
        const intervalId = setInterval(updateCurrentTime, 1000); // 1초마다 업데이트

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 해제
    }, []);

    // 로딩 중이거나 관리자 권한이 없는 경우 메시지 출력
    if (isLoading) {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ fontSize: '1.5rem', height: '100vh' }}>
                <Spinner animation="border" role="status" className="mb-3" />
                <div>관리자 권한 확인 중...</div>
            </Container>
        );
    }

    return (
        <BasicLayout>
            <Carousel>
                <Carousel.Item>
                    <div id='slider1'>
                        <div className='slider1_text'>
                            <h2>관리자 페이지입니다</h2>
                            <h5>현재 시간 : {currentTime}</h5>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div id='slider2'>
                        <div className='slider1_text'>
                            <h2>S B C A M P I N G</h2>
                            <h5>오늘도 좋은 하루 되세요</h5>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
            <hr/>
            <div id='communitywrap' className='border-0'>
                <div id='calendarwrap' className='m-600 border-4 h-100 round-1 shadow-sky-700'
                     onClick={() => navigate('/admin/res/datesite')}>
                    <ResCalendar/>
                </div>
                <div id='guidewrap' className='m-1 border-0'>
                    <div className="d-flex flex-column gap-3"> {/* gap-4에서 gap-3으로 변경 */}
                        {/* 총 매출 */}
                        <div className="card-container mb-2"> {/* margin-bottom 줄임 */}
                            <div className="card rounded-3 shadow h-100" onClick={() => navigate('/admin/stats/sales')}>
                                <div className="card-body text-center">
                                    <h4 className="card-title mb-3">당월 총 매출</h4> {/* mb-4에서 mb-3으로 변경 */}
                                    <div className="mt-3 p-3 bg-light rounded"> {/* mt-4에서 mt-3으로 변경 */}
                                        <div className="d-flex justify-content-center align-items-center">
                                            <h2 className="display-4 mb-0 text-dark">
                                                {salesData.totalStats.totalCompletedAmount ? 
                                                    new Intl.NumberFormat('ko-KR').format(salesData.totalStats.totalCompletedAmount) 
                                                    : '0'}
                                            </h2>
                                            <span className="ms-2 text-muted">원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 누적 예약 고객 분석 */}
                        <div className="card-container mt-2"> {/* mt-4에서 mt-2로 변경 */}
                            <div className="card rounded-3 shadow h-100" onClick={() => navigate('/admin/stats/customer')}>
                                <div className="card-body text-center">
                                    <h4 className="card-title mb-4">당월 누적 예약 고객</h4>
                                    <div className="mt-4 p-3 bg-light rounded">
                                        <h5 className="text-primary mb-3">총 누적 예약 고객수</h5>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <h2 className="display-4 mb-0 text-dark">
                                                {totalReservationStats.totalReservations}
                                            </h2>
                                            <span className="ms-2 text-muted">명</span>
                                        </div>
                                        <p className="text-muted mt-2">
                                            일 평균 예약 고객수:
                                            <span className="fw-bold ms-2">
                                                {totalReservationStats.averageReservationsPerDay
                                                    ? totalReservationStats.averageReservationsPerDay.toFixed(2)
                                                    : 'N/A'} 명
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4 p-3 bg-light rounded">
                                        <h5 className="text-success mb-3">재예약 고객 비율</h5>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <h2 className="display-4 mb-0 text-dark">
                                                {rebookingRate ? rebookingRate.toFixed(1) : 'N/A'}
                                            </h2>
                                            <span className="ms-2 text-muted">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default MainPage;

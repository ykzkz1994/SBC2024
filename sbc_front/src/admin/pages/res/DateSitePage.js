
import React, { useState } from 'react'; // React는 리액트 기본 라이브러리이며, useState는 상태 관리를 위한 훅입니다.
import ResCalendar from '../../components/res/ResCalendar'; // ResCalendar 컴포넌트를 임포트합니다. 경로에 오타가 없도록 확인하세요.
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate는 경로 이동을, useLocation은 현재 경로 정보를 얻기 위한 훅입니다.
import BasicLayout from "../../layouts/BasicLayout"; // BasicLayout 컴포넌트를 임포트

const DateSitePage = () => {
    const [currentComponent, setCurrentComponent] = useState('DateSitePage'); // 현재 컴포넌트 상태 관리
    const navigate = useNavigate(); // 경로 이동 훅
    const location = useLocation(); // 현재 경로정보를 얻기훅 =>네비게이션 백그라운드 색상때문에

    // 디버깅 확인용 로그
    console.log("DateSitePage 로드 됐다!!!!");

    // 현재경로의 네비버튼 비활성화할 조건을 확인하는 함수
    const isCurrentPage = (path) => location.pathname === path;

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* 페이지 중앙 정렬컨테이너 */}
            <div style={{ width: '100%' }}>
                <h1>날짜/구역별 예약 리스트 페이지</h1> {/* 페이지 제목 */}
                <hr />
                <br />
                <br />

                {/* 예약 상태 안내문구 우정렬*/}
                <div className="mb-4 text-right">
                    <span className="text-red-500 font-bold">빨간색</span> - 예약이 완료된 구역&nbsp;&nbsp;
                    <br/>
                    <span className="text-blue-500">파란색</span> - 예약된 내역이 없는 구역
                </div>

                {/* 예약달력컴포넌트 렌더링 */}
                <ResCalendar />
            </div>
        </div>
    );
};

export default DateSitePage;

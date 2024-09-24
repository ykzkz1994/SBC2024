import React, { useState } from 'react'; // React 기본 라이브러리 및 useState 훅
import CancelList from '../../components/res/CancelList'; // 취소 리스트 컴포넌트
import ResList from '../../components/res/ResList'; // 예약 리스트 컴포넌트
import TotalList from '../../components/res/TotalList'; // 전체 리스트 컴포넌트
import { Link } from "react-router-dom"; // 페이지 이동을 위한 Link 훅

const TotalPage = () => {
    // 컴포넌트 상태를 변경할 수 있는 함수, 기본값은 'TotalList'
    const [currentComponent, setCurrentComponent] = useState('TotalList');

    const renderComponent = () => {
        switch (currentComponent) { // 여러 컴포넌트를 변경하는 스위치문
            case 'TotalList':   // 셀렉트 옵션이 '전체 예약 조회'인 경우
                return <TotalList />;
            case 'ResList':     // 셀렉트 옵션이 '예약 완료 조회'인 경우
                return <ResList />;
            case 'CancelList':  // 셀렉트 옵션이 '예약 취소 조회'인 경우
                return <CancelList />;
            default:            // 기본값은 TotalList
                return <TotalList />;
        }
    };

    return (
        <div>
            <div>
                <div>
                    <Link to={'/res/total'}>전체예약리스트</Link>
                    <br />
                    <Link to={'/res/datesite'}>날짜 / 구역별 예약 리스트</Link>
                </div>
            </div>
            <h1>전체 예약 조회 페이지</h1>

            <select value={currentComponent} onChange={(e) => setCurrentComponent(e.target.value)}>
                <option value="TotalList">전체 예약 조회</option>
                <option value="ResList">예약 완료 조회</option>
                <option value="CancelList">예약 취소 조회</option>
            </select>

            {renderComponent()}
        </div>
    );
};

export default TotalPage;

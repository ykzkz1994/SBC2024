import React, { useState } from 'react'; // React 기본 라이브러리 및 useState 훅
import CancelList from '../../components/res/CancelList'; // 취소 리스트 컴포넌트
import ResList from '../../components/res/ResList'; // 예약 리스트 컴포넌트
import TotalList from '../../components/res/TotalList'; // 전체 리스트 컴포넌트
import {Link, useLocation, useNavigate} from "react-router-dom";
import ResMenu  from "../../components/menus/ResMenu";
import BasicLayout from "../../layout/BasicLayout";
import CommunityMenu from "../../components/menus/CommunityMenu"; // 페이지 이동을 위한 Link 훅

const TotalPage = () => {

    // 컴포넌트 상태를 변경할 수 있는 함수, 기본값은 'TotalList'
    const [currentComponent, setCurrentComponent] = useState('TotalList');
    const navigate = useNavigate(); // 경로 이동을 위한 훅
    const location = useLocation(); // 현재 경로 정보를 얻기 위한 훅

    //디버깅확인용 로그
    console.log("TotalPage 로드 됐따!!!!");

    //컴포넌트 랜더링 함수
    const renderComponent = () => {
        //셀렉으로 스위치문에 할당된 crurrentComponent값 변경
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
    // 현재 경로와 비교하여 버튼을 비활성화할 조건
    const isCurrentPage = (path) => location.pathname === path;


    return (

        <div>

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

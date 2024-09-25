import React from 'react';
import {useCallback} from "react";
import BasicLayout from "../../layout/BasicLayout";
import {Link, Outlet, useNavigate} from 'react-router-dom';

const ResIndexPage = () => {

    //동적 데이터 처리이동하는 useNavigate() Navigate나 Link대신 사용
    const navigate = useNavigate();

    // 클릭 시 'total'의 경로로 네비게이트 하는 이벤트 용도  함수
    const handleClickTotal = useCallback(() => {
        navigate('total'); // 경로 문자열 사용
    }, [navigate]); // 의존성 배열에 navigate 추가

    // 클릭 시 'datesite'의 경로로 네비게이트 하는 이벤트 용도 함수
    const handleClickDateSite = useCallback(() => {
        navigate('datesite'); // 경로 문자열 사용
    }, [navigate]); // 의존성 배열에 navigate 추가

    return (
        <BasicLayout>
            <div className="w-full flex m-2 p-2 ">
                <h2>예약 리스트 인덱스 페이지</h2>

                <div>
                    <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
                         onClick={handleClickTotal}>
                        전체 예약 조회
                    </div>

                    <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
                         onClick={handleClickDateSite}>
                        날짜 / 구역별 예약 조회
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap w-full">
                {/* 자식 라우트의 컴포넌트가 여기에 렌더링됩니다 */}
                <Outlet/>
            </div>
        </BasicLayout>

    );
};

export default ResIndexPage;

import React,{useState} from 'react'; //React=리액트 기본 라이브러리 ,{useState}여러 컴포넌트 교체를 위한 훅
import DateSiteResList from '../../components/res/DateSiteResList'; //해당 페이지에서 보여줄 DateSiteResList를 import (달력형 예약확인  컴포넌트 )
import {Link} from "react-router-dom";



//함수
const DateSitePage = () => {

    //컴포넌트 상태를 변경 할 수 있는 함수 기본값은 'TotalList'
    const [currentComponent,setCurrentComponent]=useState('DateSitePage');


    return (
        <div>

            <div>
                <div>
                    <Link to={'/res/total'}>전체예약리스트</Link>
                    <br/>
                    <Link to={'/res/datesite'}>날짜 / 구역별 예약 리스트</Link>
                </div>

            </div>
            <h1>날짜/구역별 예약 리스트 컴포넌트 페이지</h1>

            <DateSiteResList/>

        </div>


    );
};

export default DateSitePage;

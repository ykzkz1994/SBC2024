import React,{useState} from 'react'; //React=리액트 기본 라이브러리 ,{useState}여러 컴포넌트 교체를 위한 훅
import DateSiteResList from '../../components/res/DateSiteResList';
import { useNavigate, useLocation } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";

const DateSitePage = () => {
    const [currentComponent, setCurrentComponent] = useState('DateSitePage');
    const navigate = useNavigate(); // 경로 이동을 위한 훅
    const location = useLocation(); // 현재 경로 정보를 얻기 위한 훅

    //디버깅확인용 로그
    console.log("DateSitePage 로드 됐따!!!!");

    // 현재 경로와 비교하여 버튼을 비활성화할 조건
    const isCurrentPage = (path) => location.pathname === path;

    return (
        <BasicLayout>
            <div>
                <div>
                    <div>
                        {/* 전체예약리스트 버튼 */}
                        <button
                            onClick={() => navigate('/res/total')}
                            disabled={isCurrentPage('/res/total')}
                        >
                            전체예약리스트
                        </button>
                        <br/>
                        {/* 날짜 / 구역별 예약 리스트 버튼 */}
                        <button
                            onClick={() => navigate('/res/datesite')}
                            disabled={isCurrentPage('/res/datesite')}
                        >
                            날짜 / 구역별 예약 리스트
                        </button>
                    </div>
                </div>
                <h1>날짜/구역별 예약 리스트 페이지</h1>

                <DateSiteResList/>
            </div>
        </BasicLayout>

    );
};

export default DateSitePage;

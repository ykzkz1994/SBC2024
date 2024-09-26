import '../../css/menu.css';
import {useNavigate} from "react-router-dom"
import React, {useCallback} from "react";
import Button from "react-bootstrap/Button";



const ResMenu = () => {
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

        <>
            <div id='menubuttonwrap'>
                {/*버튼을 클릭하면 경로이동 이벤트 발생*/}
                <Button className='menubutton' onClick={handleClickTotal}>전체 예약 리스트 </Button>
                <Button className='menubutton' onClick={handleClickDateSite}>날짜 / 구역별 예약</Button>

            </div>
        </>

    );

}

export default ResMenu;
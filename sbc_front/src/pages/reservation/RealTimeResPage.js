import React, {useState} from "react";
import campingImg from "../../images/campingimg.png"
import MonthComponent from "../../components/campingRes/MonthComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const RealTimeResPage = () => {

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
    const [direction, setDirection] = useState(null); // 방향 상태 추가

    const monthsToAdd = 2;
    const monthSum = (currentMonth + monthsToAdd - 1) % 12 + 1;

    const handleClick = (dir) => {
        setDirection(dir); // 클릭한 방향을 상태에 저장
    };

    // 로그인 여부 확인
    const {isLogin, moveToLoginReturn} = useCustomLogin()
    if (!isLogin) {
        return moveToLoginReturn()
    }

    return (
        <div>
            <div style={{marginBottom: "20px"}}><h3>구역지도</h3></div>
            <div style={{
                marginBottom: "30px"
            }}>
                <img style={{}} src={campingImg} alt="안나와 왜"/>
            </div>

            <div>
                <MonthComponent></MonthComponent>
            </div>
        </div>
    );
};

export default RealTimeResPage;

import {useState} from "react";
import SalesComponent from "../../components/stats/SalesComponent";
import ResRateComponent from "../../components/stats/ResRateComponent";
import ResCancelComponent from "../../components/stats/ResCancelComponent";

const ReservationSalesPage = () => {
    const wrapperStyle = {
        width: '100%',
        height: '400px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const borderStyle = {
        border : '2px solid #333',
    }

    const [currentComponent, setCurrentComponent] = useState('sales');

    const handleButtonClick = (component) => {
        setCurrentComponent(component);
    }

    return (
        <>
            <h1>예약 매출 통계</h1>
            <nav>

                <button onClick={()=> handleButtonClick('sales')}>매출 현황</button>
                <button onClick={()=> handleButtonClick('rate')}>예약률 현황</button>
                <button onClick={()=> handleButtonClick('cancel')}>예약취소 현황</button>

            </nav>
            <div>사이트
                <select className="siteName">
                    <option value="A">DECK-A</option>
                    <option value="B">DECK-B</option>
                    <option value="C">DECK-C</option>
                    <option value="D">DECK-D</option>
                    <option value="E">DECK-E</option>
                </select></div>
            <div>조회기간
                <select className="dateType">
                    <option value="day">일간</option>
                    <option value="month">월간</option>
                    <option value="year">연간</option>
                </select>
                <input type={"date"} id={"start"}/> ~ <input type={"date"} id={"end"}/>
                <button>조회</button>
                <span>* 한 번에 조회할 수 있는 기간은 최대 90일입니다.</span>
            </div>
            <div className={"componentWrapper"}>
                {currentComponent === 'sales' && <SalesComponent/>}
                {currentComponent === 'rate' && <ResRateComponent/>}
                {currentComponent === 'cancel' && <ResCancelComponent/>}
            </div>
        </>
    );
}

export default ReservationSalesPage;
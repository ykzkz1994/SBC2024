import CustomerComponent from "../../components/stats/CustomerComponent";
import ReviewComponent from "../../components/stats/ReviewComponent";
import {useState} from "react";
import SalesComponent from "../../components/stats/SalesComponent";
import ResRateComponent from "../../components/stats/ResRateComponent";
import ResCancelComponent from "../../components/stats/ResCancelComponent";

const CustomerPage = () => {
    const [currentComponent, setCurrentComponent] = useState('customer');

    const handleButtonClick = (component) => {
        setCurrentComponent(component);
    }

    return (
        <>
            <h1>고객 통계</h1>
            <nav>

                <button onClick={() => handleButtonClick('customer')}>예약 고객 현황</button>
                <button onClick={() => handleButtonClick('review')}>고객 리뷰 현황</button>

            </nav>
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
                {currentComponent === 'customer' && <CustomerComponent/>}
                {currentComponent === 'review' && <ReviewComponent/>}
            </div>

        </>
    );
}

export default CustomerPage;
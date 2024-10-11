import CustomerComponent from "../../components/stats/CustomerComponent";
import ReviewComponent from "../../components/stats/ReviewComponent";
import {useState} from "react";
import DateSearchComponent from "../../components/stats/DateSearchComponent";

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
            <div>
                <DateSearchComponent/>
            </div>
            <div className={"componentWrapper"}>
                {currentComponent === 'customer' && <CustomerComponent/>}
                {currentComponent === 'review' && <ReviewComponent/>}
            </div>

        </>
    );
}

export default CustomerPage;
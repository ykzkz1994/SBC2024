import {useEffect, useState} from "react";
import SalesComponent from "../../components/stats/SalesComponent";
import ResRateComponent from "../../components/stats/ResRateComponent";
import ResCancelComponent from "../../components/stats/ResCancelComponent";
import DateSearchComponent from "../../components/stats/DateSearchComponent";
import {getAllSites} from "../../api/SiteApi";

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

    // 사이트 전체 정보 목록을 저장하는 변수
    const [sites, setSites] = useState([]);

// 데이터 불러오는 비동기 함수
    const fetchSites = async () => {
        try {
            //변수 data에 geSiteDataALL의 Responce.data를 할당
            const data = await getAllSites();
            //set 생성자(변수)
            setSites(data);
        } catch (err) {
            console.error('사이트 데이터를 불러오는데 실패했습니다:', err);
        }
    };

    useEffect(() => {
        fetchSites();
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 호출

    return (
        <>
            <h1>예약 매출 통계</h1>
            <nav>

                <button onClick={()=> handleButtonClick('sales')}>매출 현황</button>
                <button onClick={()=> handleButtonClick('rate')}>예약률 현황</button>
                <button onClick={()=> handleButtonClick('cancel')}>예약취소 현황</button>

            </nav>
            <div>
                <label>
                    사이트
                <select className="siteName">
                    {/* value: site ID */}
                    {sites.length > 0 ? (
                        sites.map(site => (
                            <option key={site.siteId} value={site.siteId}>
                                {site.siteName}
                            </option>
                        ))
                    ) : (
                        <option value="">사이트 데이터가 없습니다.</option>
                    )}
                </select> </label>
            <DateSearchComponent/>
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
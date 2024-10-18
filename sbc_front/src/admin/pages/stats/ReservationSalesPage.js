import {useEffect, useState} from "react";
import SalesComponent from "../../components/stats/SalesComponent";
import ResRateComponent from "../../components/stats/ResRateComponent";
import ResCancelComponent from "../../components/stats/ResCancelComponent";
import {getAllSites} from "../../api/SiteApi";
import {Tab, Tabs} from "react-bootstrap";

export const SiteSelect = () => {

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
        <div>
            <hr/>
            <label>
                사이트
                <select className="siteName">
                    <option value={"default"}>전체</option>
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
            <hr/>
        </div>
    );
}


const ReservationSalesPage = () => {

    return (
        <>
            <h1>예약 매출 통계</h1>
            <nav>
                <Tabs
                    defaultActiveKey="sales"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="sales" title="매출 현황">
                        <SiteSelect/>
                        <SalesComponent/>
                    </Tab>
                    <Tab eventKey="rate" title="예약률 현황">
                        <SiteSelect/>
                        <ResRateComponent/>
                    </Tab>
                    <Tab eventKey="cancel" title="예약취소 현황">
                        <SiteSelect/>
                        <ResCancelComponent/>
                    </Tab>
                </Tabs>

            </nav>


        </>
    );
}

export default ReservationSalesPage;
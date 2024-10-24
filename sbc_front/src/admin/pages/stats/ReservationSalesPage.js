import React, { useState, useEffect } from "react";
import SalesComponent from "../../components/stats/SalesComponent";
import ResCancelComponent from "../../components/stats/ResCancelComponent";
import { Tab, Tabs } from "react-bootstrap";
import { fetchSalesStats } from "../../api/statsApi";

const ReservationSalesPage = () => {
    const [salesStats, setSalesStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dateType, setDateType] = useState('day');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const handleSearch = async (searchParams) => {
        setLoading(true);
        try {
            const data = await fetchSalesStats(searchParams);
            setSalesStats(data);
            setDateType(searchParams.dateType || dateType);
            setError(null);
        } catch (err) {
            console.error('데이터를 불러오는 데 실패했습니다:', err);
            setError('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 초기 데이터 로드
        handleSearch({
            dateType,
            selectedYear,
            selectedMonth,
        });
    }, [dateType, selectedYear, selectedMonth]);

    return (
        <>
            <h1>예약 매출 통계</h1>
            <hr />
            <nav>
                <Tabs defaultActiveKey="sales" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="sales" title="매출 현황">
                        <SalesComponent
                            salesStats={salesStats}
                            loading={loading}
                            error={error}
                            dateType={dateType}
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            onSearch={handleSearch}
                        />
                    </Tab>
                    <Tab eventKey="cancel" title="예약취소 현황">
                        <ResCancelComponent />
                    </Tab>
                </Tabs>
            </nav>
        </>
    );
};

export default ReservationSalesPage;

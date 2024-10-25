import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import SearchComponent from "./SearchComponent";
import { fetchCancelStats } from "../../api/statsApi";

const ResCancelComponent = () => {
    const [cancelStats, setCancelStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        dateType: 'day',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        siteId: null
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
            maximumFractionDigits: 0
        }).format(amount).replace('₩', '') + '원';
    };

    const onSearch = async (newSearchParams) => {
        setSearchParams(newSearchParams);
        setLoading(true);
        try {
            const data = await fetchCancelStats(newSearchParams);
            setCancelStats(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        onSearch(searchParams);
    }, []);

    const renderTableContent = () => {
        if (loading) return <tr><td colSpan="3">Loading...</td></tr>;
        if (error) return <tr><td colSpan="3">Error: {error}</td></tr>;
        if (!cancelStats || !cancelStats.stats || cancelStats.stats.length === 0) {
            return <tr><td colSpan="3">해당 기간에 데이터가 존재하지 않습니다.</td></tr>;
        }

        let totalCancelCount = 0;
        let totalCancelAmount = 0;

        // 총합을 계산합니다.
        cancelStats.stats.forEach(stat => {
            totalCancelCount += stat.cancelCount;
            totalCancelAmount += stat.cancelAmount;
        });

        // 총합 행 추가
        const rows = [
            <tr key="total" style={{fontWeight: 'bold'}}>
                <td>합계</td>
                <td>{totalCancelCount}</td>
                <td>{formatCurrency(totalCancelAmount)}</td>
            </tr>
        ];

        // 데이터 행 추가
        cancelStats.stats.forEach((stat, index) => {
            let displayDate = stat.resCancelDate;

            // 날짜 형식에 따라 출력 형식을 조정합니다.
            if (searchParams.dateType === 'year') {
                displayDate = displayDate.substring(0, 7); // "YYYY-MM"
            } else {
                displayDate = displayDate; // "YYYY-MM-DD" 형식
            }

            // 데이터가 있는 경우에만 행 추가
            if (stat.cancelCount > 0 || totalCancelAmount > 0) {
                rows.push(
                    <tr key={index + 1}>
                        <td>{displayDate}</td>
                        <td>{stat.cancelCount}</td>
                        <td>{formatCurrency(stat.cancelAmount)}</td>
                    </tr>
                );
            }
        });

        return rows;
    };

    return (
        <>
            <SearchComponent onSearch={onSearch}/>
            <hr/>
            <Table bordered>
                <thead>
                <tr>
                    <th>예약 취소 날짜</th>
                    <th>취소건수</th>
                    <th>취소 금액</th>
                </tr>
                </thead>
                <tbody>
                {renderTableContent()}
                </tbody>
            </Table>
        </>
    );
};

export default ResCancelComponent;

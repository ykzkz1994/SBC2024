import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import SearchComponent from "./SearchComponent";

const SalesComponent = ({ salesStats, loading, error, dateType, selectedYear, selectedMonth, onSearch }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
            maximumFractionDigits: 0
        }).format(amount).replace('₩', '') + '원';
    };

    const aggregateMonthlyData = (statsList, year) => {
        const monthlyData = {};
        for (let i = 1; i <= 12; i++) {
            const month = `${year}-${String(i).padStart(2, '0')}`; // YYYY-MM 형식으로 생성
            monthlyData[month] = {
                resDate: month, // 여기서 yyyy-MM 형식으로 설정
                scheduledCount: 0,
                scheduledAmount: 0,
                completedCount: 0,
                completedAmount: 0
            };
        }

        statsList.forEach(stat => {
            const month = stat.resDate.substring(0, 7); // YYYY-MM
            if (monthlyData[month]) {
                monthlyData[month].scheduledCount += stat.scheduledCount;
                monthlyData[month].scheduledAmount += stat.scheduledAmount;
                monthlyData[month].completedCount += stat.completedCount;
                monthlyData[month].completedAmount += stat.completedAmount;
            }
        });

        return Object.values(monthlyData); // 모든 월 데이터를 반환
    };

    const renderTableContent = () => {
        // salesStats가 null일 경우 처리
        if (!salesStats || !salesStats.statsList) {
            return <tr><td colSpan="7">데이터가 없습니다.</td></tr>;
        }

        let statsToRender = salesStats.statsList;
        let year;

        if (dateType === 'year') {
            year = salesStats.startDate ? salesStats.startDate.substring(0, 4) : new Date().getFullYear();
            statsToRender = aggregateMonthlyData(salesStats.statsList, year);
        } else {
            year = selectedYear || new Date().getFullYear(); // 연도 초기화
        }

        const monthlyData = [];
        if (dateType === 'year') {
            for (let i = 1; i <= 12; i++) {
                const month = `${year}-${String(i).padStart(2, '0')}`;
                const stat = statsToRender.find(s => s.resDate === month) || {
                    resDate: month,
                    scheduledCount: 0,
                    scheduledAmount: 0,
                    completedCount: 0,
                    completedAmount: 0,
                };
                monthlyData.push(stat);
            }
        } else {
            // 일별 및 월별 검색 시
            monthlyData.push(...statsToRender.filter(stat => stat.scheduledCount > 0 || stat.completedCount > 0));
        }

        // 일별 또는 월별 검색 시 데이터가 모두 0인 경우 처리
        if (dateType !== 'year' && monthlyData.length === 0) {
            return <tr><td colSpan="7">데이터가 없습니다.</td></tr>;
        }

        // 합계 계산
        const totalCount = monthlyData.reduce((acc, stat) => acc + stat.scheduledCount + stat.completedCount, 0);
        const totalAmount = monthlyData.reduce((acc, stat) => acc + stat.scheduledAmount + stat.completedAmount, 0);

        return (
            <>
                {monthlyData.map((stat, index) => (
                    <tr key={index}>
                        <td>{stat.resDate}</td> {/* YYYY-MM 형식으로 출력 */}
                        <td>{stat.scheduledCount + stat.completedCount}</td>
                        <td>{formatCurrency(stat.scheduledAmount + stat.completedAmount)}</td>
                        <td>{stat.completedCount}</td>
                        <td>{formatCurrency(stat.completedAmount)}</td>
                        <td>{stat.scheduledCount}</td>
                        <td>{formatCurrency(stat.scheduledAmount)}</td>
                    </tr>
                ))}
                {salesStats.totalStats && (
                    <tr style={{ fontWeight: 'bold' }}>
                        <td>합계</td>
                        <td>{totalCount}</td>
                        <td>{formatCurrency(totalAmount)}</td>
                        <td>{salesStats.totalStats.totalCompletedCount}</td>
                        <td>{formatCurrency(salesStats.totalStats.totalCompletedAmount)}</td>
                        <td>{salesStats.totalStats.totalScheduledCount}</td>
                        <td>{formatCurrency(salesStats.totalStats.totalScheduledAmount)}</td>
                    </tr>
                )}
            </>
        );
    };


    useEffect(() => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;

        if (dateType === 'month') {
            onSearch(selectedYear || currentYear, selectedMonth || currentMonth);
        }
    }, [onSearch, dateType, selectedYear, selectedMonth]);

    return (
        <>
            <SearchComponent onSearch={onSearch} />
            <hr />
            <Table bordered>
                <thead>
                <tr>
                    <th rowSpan="2">날짜</th>
                    <th colSpan="2">실매출</th>
                    <th colSpan="2">이용완료</th>
                    <th colSpan="2">이용예정</th>
                </tr>
                <tr>
                    <th>예약건수</th>
                    <th>금액</th>
                    <th>예약건수</th>
                    <th>금액</th>
                    <th>예약건수</th>
                    <th>금액</th>
                </tr>
                </thead>
                <tbody>
                {renderTableContent()}
                </tbody>
            </Table>
        </>
    );
};

export default SalesComponent;

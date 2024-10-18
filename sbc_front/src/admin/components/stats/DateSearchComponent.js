// 조회기간 기능 구현
// 1. 일간을 선택했을 때 최대 90일까지만 검색 (ok)
// 2. 월간, 연간을 선택했을때 input 변경 (ok)


import {useState} from "react";
import SalesComponent from "./SalesComponent";

const DateSearchComponent = () => {
    const [dateType, setDateType] = useState('day');
    const [msg, setMsg] = useState('* 한 번에 조회할 수 있는 기간은 최대 90일입니다.');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleDateTypeChange = (event) => {
        const selectedType = event.target.value;
        setDateType(selectedType);
        setStartDate('');
        setEndDate('');

        if (selectedType === 'month') {
            setMsg(''); // day가 아닐 때 메시지를 비웁니다.
        } else if (selectedType === 'year') {
            setMsg('* 조회할 수 있는 연도는 최근 3년 이내입니다.')
        } else {
            setMsg('* 한 번에 조회할 수 있는 기간은 최대 90일입니다.');
        }
    };

    // 90일까지 검색하게 해야함
    const handleStartDateChange = (event) => {
        const selectedStartDate = event.target.value;
        setStartDate(selectedStartDate);

        // 최대 90일 후의 날짜 계산
        const maxEndDate = new Date(new Date(selectedStartDate).getTime() + 90 * 24 * 60 * 60 * 1000);
        const maxEndDateString = maxEndDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환

        setEndDate('');
        document.getElementById('end').setAttribute('max', maxEndDateString); // end input의 max 속성 설정
    };

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        const maxEndDate = new Date(new Date(startDate).getTime() + 90 * 24 * 60 * 60 * 1000);
        const maxEndDateString = maxEndDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환

        if (selectedEndDate > maxEndDateString) {
            setEndDate(maxEndDateString); // 최대 90일 이내로 자동 설정
        } else {
            setEndDate(selectedEndDate);
        }
    };

    // 최근 3년의 연도를 생성
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 3 }, (_, index) => currentYear - 2 + index); // 최근 3년을 오름차순으로 생성

    return (
        <>
            <label>
                조회기간
                <select id="dateType" name="dateType" value={dateType} onChange={handleDateTypeChange}>
                    <option value="day">일간</option>
                    <option value="month">월간</option>
                    <option value="year">연간</option>
                </select>
            </label>
            {dateType === 'day' && (
                <div>
                    <input type="date"
                           id="start"
                           value={startDate}
                           onChange={handleStartDateChange}  /> ~ <input  type="date"
                                                                          id="end"
                                                                          value={endDate}
                                                                          onChange={handleEndDateChange}
                                                                          min={startDate}/>
                </div>
            )}
            {dateType === 'month' && (
                <div>
                    <input type="month" />
                </div>
            )}
            {dateType === 'year' && (
                <div>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            )}

            <button>조회</button>
            {dateType === 'day' && <span>{msg}</span>} {/* 'day'일 때 메시지 표시 */}
            {dateType === 'year' && <span>{msg}</span>} {/* 'year'일 때 메시지 표시 */}
        </>
    );
}

export default DateSearchComponent;
// src/admin/components/res/ResCalendar.js

import React, { useState, useEffect } from 'react';

const ResCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); // 현재 선택된 날짜 상태
    const [calendarDays, setCalendarDays] = useState([]); // 달력에 표시될 날짜들 상태
    const [reservations, setReservations] = useState({}); // 예약 정보 상태
    const [modalOpen, setModalOpen] = useState(false); // 모달 창 열림 상태
    const [modalContent, setModalContent] = useState({
        reservationNumber: null, // 예약번호
        reservationDate: null,   // 예약날짜
        reservedSite: '',        // 예약구역
        reserverName: null,      // 예약자이름
        reserverNumber: null,    // 예약자번호
        userName: null,          // 이용자이름
        userNumber: null,        // 이용자번호
        checkInDate: null,       // 입실날짜
        checkOutDate: null,      // 퇴실날짜
        totalPayment: null       // 총 결제 금액
    });

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열
    const allSites = ['Site A', 'Site B', 'Site C', 'Site D', 'Site E', 'Site F', 'Site G', 'Site H', 'Site I', 'Site J']; // 모든 구역 배열

    useEffect(() => {
        generateCalendar(currentDate); // 컴포넌트가 마운트되거나 currentDate가 변경될 때 달력을 생성
        fetchReservations(); // 예약 데이터를 가져옴
    }, [currentDate]);

    // 가상 예약 데이터 설정
    const fetchReservations = () => {
        setReservations({
            '2024-10-02': ['Site A', 'Site C'],
            '2024-10-05': ['Site B', 'Site D', 'Site F'],
            '2024-10-10': ['Site E'],
            '2024-10-12': ['Site A', 'Site B', 'Site G'],
            '2024-10-15': ['Site C', 'Site D', 'Site H'],
            '2024-10-18': ['Site A', 'Site E'],
            '2024-10-20': ['Site F', 'Site I'],
            '2024-10-23': ['Site B', 'Site J'],
            '2024-10-25': ['Site D', 'Site E', 'Site F'],
            '2024-10-28': ['Site A', 'Site C', 'Site G'],
            // 추가적인 예약 정보...
        });
    };

    // 달력 생성 함수
    const generateCalendar = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const firstDayIndex = firstDayOfMonth.getDay(); // 월의 첫 번째 요일 인덱스
        const lastDate = lastDayOfMonth.getDate(); // 월의 마지막 날짜

        const days = [];

        // 이전 월의 마지막 날짜부터 현재 월의 첫 번째 요일까지 빈 셀 채우기
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            days.push({
                date: prevMonthLastDay - i,
                isCurrentMonth: false,
                formatted: `${month === 0 ? 12 : month}.${(prevMonthLastDay - i).toString().padStart(2, '0')}`
            });
        }

        // 현재 월의 날짜 채우기
        for (let i = 1; i <= lastDate; i++) {
            days.push({ date: i, isCurrentMonth: true });
        }

        // 다음 월의 날짜로 빈 셀 채우기 (총 35일로 고정)
        const nextMonthDays = 35 - days.length;
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({
                date: i,
                isCurrentMonth: false,
                formatted: `${month === 11 ? 1 : month + 2}.${i.toString().padStart(2, '0')}`
            });
        }

        setCalendarDays(days); // 생성된 날짜들을 상태에 설정
    };

    // 이전 달로 이동하는 함수
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // 다음 달로 이동하는 함수
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // 구역 클릭 시 모달 열기 함수
    const handleSiteClick = (reservationKey, site) => {
        setModalContent({
            reservationNumber: null, // 추후 추가할 예약번호
            reservationDate: reservationKey, // 예약날짜
            reservedSite: site, // 예약구역
            reserverName: null, // 추후 추가할 예약자이름
            reserverNumber: null, // 추후 추가할 예약자번호
            userName: null, // 추후 추가할 이용자이름
            userNumber: null, // 추후 추가할 이용자번호
            checkInDate: null, // 추후 추가할 입실날짜
            checkOutDate: null, // 추후 추가할 퇴실날짜
            totalPayment: null // 추후 추가할 총 결제 금액
        });
        setModalOpen(true); // 모달 창 열림
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setModalOpen(false); // 모달 창 닫힘
    };

    const today = new Date();
    const isCurrentMonth =
        currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear(); // 현재 월인지 확인
    const currentDay = today.getDate(); // 오늘 날짜

    return (
        <div className="w-full h-full p-6 flex flex-col bg-gray-100">
            {/* 모달 창 */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h2 className="text-xl font-semibold mb-4">예약 상세 정보</h2>
                        <p><strong>예약번호:</strong> {modalContent.reservationNumber || 'null'}</p>
                        <p><strong>예약날짜:</strong> {modalContent.reservationDate || 'null'}</p>
                        <p><strong>예약구역:</strong> {modalContent.reservedSite || 'null'}</p>
                        <p><strong>예약자이름:</strong> {modalContent.reserverName || 'null'}</p>
                        <p><strong>예약자번호:</strong> {modalContent.reserverNumber || 'null'}</p>
                        <p><strong>이용자이름:</strong> {modalContent.userName || 'null'}</p>
                        <p><strong>이용자번호:</strong> {modalContent.userNumber || 'null'}</p>
                        <p><strong>입실날짜:</strong> {modalContent.checkInDate || 'null'}</p>
                        <p><strong>퇴실날짜:</strong> {modalContent.checkOutDate || 'null'}</p>
                        <p><strong>총 결제 금액:</strong> {modalContent.totalPayment || 'null'}</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}

            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handlePrevMonth}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    &lt;
                </button>
                <h2 className="text-2xl font-semibold">
                    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                </h2>
                <button
                    onClick={handleNextMonth}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    &gt;
                </button>
            </div>

            {/* 요일 표시 */}
            <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-700">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={day}
                        className={`py-3 border-b ${
                            index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* 달력 그리드 */}
            <div className="grid grid-cols-7 gap-2 mt-2">
                {calendarDays.map((day, index) => {
                    if (!day) {
                        return <div key={index} className="h-full p-2 border rounded"></div>;
                    }

                    const reservationKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${day.date.toString().padStart(2, '0')}`;
                    const reservedSites = reservations[reservationKey] || [];

                    return (
                        <div
                            key={index}
                            className={`h-full p-2 border rounded overflow-auto ${
                                index % 7 === 0
                                    ? 'text-red-500'
                                    : index % 7 === 6
                                        ? 'text-blue-500'
                                        : ''
                            }`}
                            style={{
                                border:
                                    isCurrentMonth && day.isCurrentMonth && day.date === currentDay
                                        ? '2px solid red' // 오늘 날짜 테두리 강조
                                        : '1px solid #e5e7eb',
                                backgroundColor:
                                    isCurrentMonth && day.isCurrentMonth && day.date === currentDay
                                        ? '#ffe5e5' // 오늘 날짜 배경색 강조
                                        : 'white',
                            }}
                        >
                            {/* 날짜 표시 */}
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-base">{day.isCurrentMonth ? day.date : day.formatted}</span>
                                {isCurrentMonth && day.isCurrentMonth && day.date === currentDay && (
                                    <span className="text-sm text-red-500">오늘</span>
                                )}
                            </div>
                            {/* 구역 목록 */}
                            <div className="flex flex-col space-y-1">
                                {allSites.map((site, siteIndex) => {
                                    const isReserved = reservedSites.includes(site);
                                    return (
                                        <span key={siteIndex}>
                                            {isReserved ? (
                                                <span
                                                    onClick={() => handleSiteClick(reservationKey, site)}
                                                    className="text-red-500 font-bold text-sm cursor-pointer truncate hover:underline text-left w-full"
                                                    aria-label={`구역 ${site} 예약됨`}
                                                >
                                                    {site}
                                                </span>
                                            ) : (
                                                <span className="text-blue-500 text-sm truncate text-left">
                                                    {site}
                                                </span>
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResCalendar;

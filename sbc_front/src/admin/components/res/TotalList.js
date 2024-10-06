import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Search from '../res/Search'; // Search 컴포넌트 경로

const TotalList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // 페이지당 아이템 수
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('reservationNumber'); // 기본 검색 조건

    // 샘플 데이터 배열
    const reservations = Array.from({ length: 100 }).map((_, index) => ({
        id: index + 1,
        reservationNumber: `RES-${index + 1}`,
        reservationDate: '2024-01-01',
        zoneName: 'Zone A',
        memberName: '홍길동',
        memberPhone: '010-1234-5678',
        userName: '이용자명',
        userPhone: '010-8765-4321',
        checkInDate: '2024-01-02',
        checkOutDate: '2024-01-05',
        cancelDate: '2024-01-03',
        cancelReason: '개인 사정',
        payment: '100,000원',
    }));

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 검색 필터링
    const filteredReservations = reservations.filter((reservation) => {
        const term = searchTerm.toLowerCase();
        switch (selectedColumn) {
            case 'reservationNumber':
                return reservation.reservationNumber.toLowerCase().includes(term);
            case 'reservationDate':
                return reservation.reservationDate.includes(term);
            default:
                return true;
        }
    });

    // 현재 페이지에 보여줄 항목
    const currentItems = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

    // 페이지 번호 계산
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // 이전 10페이지로 이동
    const handlePrevGroup = () => {
        if (startPage > 1) {
            setCurrentPage(startPage - 1);
        }
    };

    // 다음 10페이지로 이동
    const handleNextGroup = () => {
        if (endPage < totalPages) {
            setCurrentPage(endPage + 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4">예약 완료 리스트</h2>

            {/* 검색 컴포넌트 */}
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
            />

            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>예약번호</th>
                    <th>예약한 날짜</th>
                    <th>예약 구역 이름</th>
                    <th>회원 이름</th>
                    <th>회원 전화번호</th>
                    <th>이용자명</th>
                    <th>이용자 전화번호</th>
                    <th>입실 날짜</th>
                    <th>퇴실 날짜</th>
                    <th>취소 날짜</th>
                    <th>취소 사유</th>
                    <th>결제금액 (단위: 원)</th>
                </tr>
                </thead>

                <tbody>
                {currentItems.map((reservation) => (
                    <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.reservationNumber}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.zoneName}</td>
                        <td>{reservation.memberName}</td>
                        <td>{reservation.memberPhone}</td>
                        <td>{reservation.userName}</td>
                        <td>{reservation.userPhone}</td>
                        <td>{reservation.checkInDate}</td>
                        <td>{reservation.checkOutDate}</td>
                        <td>{reservation.cancelDate}</td>
                        <td>{reservation.cancelReason}</td>
                        <td>{reservation.payment}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* 페이징 처리 */}
            <div className="mt-4 d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        {/* 이전 10페이지로 이동 */}
                        <li className={`page-item ${startPage === 1 ? 'disabled' : ''}`}>
                            <Button
                                className="page-link"
                                onClick={handlePrevGroup}
                                disabled={startPage === 1}
                            >
                                &laquo;
                            </Button>
                        </li>

                        {pageNumbers.map((pageNumber) => (
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                <Button
                                    className="page-link"
                                    onClick={() => handlePageChange(pageNumber)}
                                    style={{
                                        color: currentPage === pageNumber ? 'white' : 'blue',
                                        fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
                                        backgroundColor: currentPage === pageNumber ? 'blue' : 'transparent',
                                        border: 'none'
                                    }}
                                >
                                    {pageNumber}
                                </Button>
                            </li>
                        ))}

                        {/* 다음 10페이지로 이동 */}
                        <li className={`page-item ${endPage === totalPages ? 'disabled' : ''}`}>
                            <Button
                                className="page-link"
                                onClick={handleNextGroup}
                                disabled={endPage === totalPages}
                            >
                                &raquo;
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TotalList;

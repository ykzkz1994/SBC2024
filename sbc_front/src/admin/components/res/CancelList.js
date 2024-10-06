// src/admin/components/res/CancelList.js

import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const CancelList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // 페이지당 아이템 수를 15로 설정

    // 샘플 데이터 배열 (예약 취소 데이터)
    const reservations = Array.from({ length: 50 }).map((_, index) => ({
        id: index + 1,
        reservationDate: '2024-02-01',
        zoneName: 'Zone C',
        memberName: '이영희',
        memberPhone: '010-5555-6666',
        userName: '취소자명',
        userPhone: '010-7777-8888',
        cancelDate: '2024-02-05',
        payment: '50,000원'
    }));

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(reservations.length / itemsPerPage);

    // 현재 보여줄 페이지 번호 목록 계산 (1부터 10까지 표시)
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
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md"> {/* 크기 확장을 위해 max-w-full 적용 */}
            <h2 className="mb-4">예약 취소 리스트</h2>

            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>예약한 날짜 (년,월,일)</th>
                    <th>예약 구역 이름</th>
                    <th>회원 이름</th>
                    <th>회원 전화번호</th>
                    <th>이용자명</th>
                    <th>이용자 전화번호</th>
                    <th>취소 날짜 (년,월,일)</th>
                    <th>환불금액 (단위: 원)</th>
                </tr>
                </thead>

                <tbody>
                {currentItems.map((reservation) => (
                    <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.zoneName}</td>
                        <td>{reservation.memberName}</td>
                        <td>{reservation.memberPhone}</td>
                        <td>{reservation.userName}</td>
                        <td>{reservation.userPhone}</td>
                        <td>{reservation.cancelDate}</td>
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
}

export default CancelList;

// src/admin/components/res/ResList.js

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Search from '../res/Search'; // 검색 컴포넌트 경로

const ResList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // 페이지당 아이템 수를 15로 설정
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('reservationNumber');
    const [filteredItems, setFilteredItems] = useState([]);

    // 샘플 데이터 배열 (예약 완료 데이터)
    const reservations = Array.from({ length: 100 }).map((_, index) => ({
        id: index + 1,
        reservationNumber: `RES-${index + 1}`,
        reservationDate: `2024-01-${String(index + 1).padStart(2, '0')}`,
        zoneName: 'Zone B',
        memberName: '김철수',
        memberPhone: '010-2222-3333',
        userName: '예약자명',
        userPhone: '010-3333-4444',
        checkInDate: '2024-01-10',
        checkOutDate: '2024-01-12',
        payment: '150,000원'
    }));

    // 필터링된 데이터를 상태에 저장하고 페이지를 1로 초기화
    useEffect(() => {
        const filtered = filterItems();
        setFilteredItems(filtered);
        setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 초기화
    }, [searchTerm, selectedColumn]);

    // 선택된 컬럼을 변경하는 함수
    const handleSelectChange = (e) => {
        setSelectedColumn(e.target.value);
        setSearchTerm(''); // 검색어 초기화
    };

    // 검색어 입력 값을 업데이트하는 함수
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색어와 선택된 컬럼에 따라 데이터를 필터링하는 함수
    const filterItems = () => {
        if (!searchTerm) {
            return reservations;
        }

        return reservations.filter((reservation) => {
            const value = reservation[selectedColumn]?.toString().toLowerCase() || '';
            return value.includes(searchTerm.toLowerCase());
        });
    };

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4">예약 완료 리스트</h2>

            {/* 검색 컴포넌트 */}
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
                onSearch={() => setFilteredItems(filterItems())} // onSearch 함수 추가
            />
            <p className="mb-4 text-gray-500">날짜 형식: 년-월-일</p> {/* 날짜 형식에 대한 설명 추가 */}

            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">예약번호</th>
                    <th className="text-center">예약한 날짜</th>
                    <th className="text-center">예약 구역 이름</th>
                    <th className="text-center">회원 이름</th>
                    <th className="text-center">회원 전화번호</th>
                    <th className="text-center">이용자명</th>
                    <th className="text-center">이용자 전화번호</th>
                    <th className="text-center">입실 날짜</th>
                    <th className="text-center">퇴실 날짜</th>
                    <th className="text-right">결제금액 (단위: 원)</th>
                </tr>
                </thead>

                <tbody>
                {currentItems.map((reservation) => (
                    <tr key={reservation.id}>
                        <td className="text-center">{reservation.id}</td>
                        <td className="text-center">{reservation.reservationNumber}</td>
                        <td className="text-center">{reservation.reservationDate}</td>
                        <td className="text-left">{reservation.zoneName}</td>
                        <td className="text-left">{reservation.memberName}</td>
                        <td className="text-center">{reservation.memberPhone}</td>
                        <td className="text-left">{reservation.userName}</td>
                        <td className="text-center">{reservation.userPhone}</td>
                        <td className="text-center">{reservation.checkInDate}</td>
                        <td className="text-center">{reservation.checkOutDate}</td>
                        <td className="text-right">{reservation.payment}</td>
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

export default ResList;

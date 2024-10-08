// src/admin/components/res/TotalList.js

import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Search from '../res/Search'; // 올바른 경로로 수정
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // react-icons 임포트

const TotalList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('reservationNumber');

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const reservations = useMemo(() => (
        Array.from({ length: 100 }).map((_, index) => ({
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
        }))
    ), []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedColumn]);

    const filteredReservations = useMemo(() => {
        if (!searchTerm.trim()) return reservations;

        const escapeRegExp = (string) => string.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
        const regexPattern = escapeRegExp(searchTerm).replace(/\*/g, '.*').replace(/\?/g, '.');

        let regex;
        try {
            regex = new RegExp(regexPattern, 'i');
        } catch (e) {
            console.error('Invalid search pattern:', e);
            return reservations;
        }

        return reservations.filter((reservation) => {
            const field = reservation[selectedColumn];
            return field && regex.test(field);
        });
    }, [reservations, searchTerm, selectedColumn]);

    const sortedReservations = useMemo(() => {
        if (!sortConfig.key) return filteredReservations;

        return [...filteredReservations].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // 결제금액 (payment) 컬럼 처리: 문자열을 숫자로 변환
            if (sortConfig.key === 'payment') {
                aValue = parseInt(aValue.replace(/,/g, '').replace('원', ''), 10);
                bValue = parseInt(bValue.replace(/,/g, '').replace('원', ''), 10);
            }

            // 날짜 컬럼 처리
            const dateColumns = ['reservationDate', 'checkInDate', 'checkOutDate', 'cancelDate'];
            if (dateColumns.includes(sortConfig.key)) {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            // 숫자 비교
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // 날짜 비교
            if (aValue instanceof Date && bValue instanceof Date) {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // 문자열 비교 (localeCompare 사용)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue, 'ko', { sensitivity: 'base' })
                    : bValue.localeCompare(aValue, 'ko', { sensitivity: 'base' });
            }

            return 0;
        });
    }, [filteredReservations, sortConfig]);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return sortedReservations.slice(indexOfFirstItem, indexOfLastItem);
    }, [sortedReservations, currentPage, itemsPerPage]);

    const totalPages = useMemo(() => Math.ceil(sortedReservations.length / itemsPerPage), [sortedReservations.length, itemsPerPage]);

    const startPage = useMemo(() => Math.floor((currentPage - 1) / 10) * 10 + 1, [currentPage]);
    const endPage = useMemo(() => Math.min(startPage + 9, totalPages), [startPage, totalPages]);

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [startPage, endPage]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevGroup = () => { if (startPage > 1) setCurrentPage(startPage - 10); };
    const handleNextGroup = () => { if (endPage < totalPages) setCurrentPage(endPage + 1); };
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };
    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4">예약 완료 리스트</h2>
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
            />
            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr>
                    {/* 각 컬럼 헤더에 정렬 기능 추가 */}
                    <th onClick={() => handleSort('reservationNumber')} style={{ cursor: 'pointer' }}>
                        예약번호 {renderSortIcon('reservationNumber')}
                    </th>
                    <th onClick={() => handleSort('reservationDate')} style={{ cursor: 'pointer' }}>
                        예약한 날짜 {renderSortIcon('reservationDate')}
                    </th>
                    <th onClick={() => handleSort('zoneName')} style={{ cursor: 'pointer' }}>
                        예약 구역 이름 {renderSortIcon('zoneName')}
                    </th>
                    <th onClick={() => handleSort('memberName')} style={{ cursor: 'pointer' }}>
                        회원 이름 {renderSortIcon('memberName')}
                    </th>
                    <th onClick={() => handleSort('memberPhone')} style={{ cursor: 'pointer' }}>
                        회원 전화번호 {renderSortIcon('memberPhone')}
                    </th>
                    <th onClick={() => handleSort('userName')} style={{ cursor: 'pointer' }}>
                        이용자명 {renderSortIcon('userName')}
                    </th>
                    <th onClick={() => handleSort('userPhone')} style={{ cursor: 'pointer' }}>
                        이용자 전화번호 {renderSortIcon('userPhone')}
                    </th>
                    <th onClick={() => handleSort('checkInDate')} style={{ cursor: 'pointer' }}>
                        입실 날짜 {renderSortIcon('checkInDate')}
                    </th>
                    <th onClick={() => handleSort('checkOutDate')} style={{ cursor: 'pointer' }}>
                        퇴실 날짜 {renderSortIcon('checkOutDate')}
                    </th>
                    <th onClick={() => handleSort('cancelDate')} style={{ cursor: 'pointer' }}>
                        취소 날짜 {renderSortIcon('cancelDate')}
                    </th>
                    <th onClick={() => handleSort('cancelReason')} style={{ cursor: 'pointer' }}>
                        취소 사유 {renderSortIcon('cancelReason')}
                    </th>
                    <th onClick={() => handleSort('payment')} style={{ cursor: 'pointer' }}>
                        결제금액 (단위: 원) {renderSortIcon('payment')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (
                    currentItems.map((reservation) => (
                        <tr key={reservation.id}>
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
                    ))
                ) : (
                    <tr>
                        <td colSpan="12" className="text-center">검색 결과가 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <div className="mt-4 d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${startPage === 1 ? 'disabled' : ''}`}>
                            <Button className="page-link" onClick={handlePrevGroup} disabled={startPage === 1}>
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
                        <li className={`page-item ${endPage === totalPages ? 'disabled' : ''}`}>
                            <Button className="page-link" onClick={handleNextGroup} disabled={endPage === totalPages}>
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

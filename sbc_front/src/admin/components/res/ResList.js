// src/admin/components/res/ResList.js

import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Spinner, Alert } from 'react-bootstrap';
import Search from '../res/Search'; // 검색 컴포넌트 경로
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // react-icons 임포트
import { getResDataAll } from '../../api/ResApi'; // 실제 API 호출 함수

const ResList = () => {
    // 예약목록 전체를 저장 하는 변수
    const [reservations, setReservations] = useState([]);

    // 로딩 상태
    const [loading, setLoading] = useState(true);

    // 에러 상태
    const [error, setError] = useState('');

    // 페이지 값 설정하는 코드 초기값은 1로 설정
    const [currentPage, setCurrentPage] = useState(1);

    // 한 페이지에 출력할 예약 수
    const itemsPerPage = 15;

    // 검색어와 선택된 컬럼 상태
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('reservationNumber');

    // 정렬 설정
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });



    // 데이터 페칭 함수
    const fetchReservations = async () => {
        try {
            const data = await getResDataAll();
            setReservations(data);
            setError('');
        } catch (err) {
            console.error('예약 데이터를 불러오는데 실패했습니다:', err);
            setError('예약 데이터를 불러오는데 실패했습니다.');
        }
    };

    // 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
        fetchReservations();
    }, []);

    // 필터링된 데이터 계산 (useMemo 사용)
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
            return field && regex.test(field.toString());
        });
    }, [reservations, searchTerm, selectedColumn]);

    // 정렬된 데이터 계산 (useMemo 사용)
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

    // 현재 페이지의 데이터 계산 (useMemo 사용)
    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return sortedReservations.slice(indexOfFirstItem, indexOfLastItem);
    }, [sortedReservations, currentPage, itemsPerPage]);

    // 총 페이지 수 계산 (useMemo 사용)
    const totalPages = useMemo(() => Math.ceil(sortedReservations.length / itemsPerPage), [sortedReservations.length, itemsPerPage]);

    // 현재 보여줄 페이지 번호 목록 계산 (useMemo 사용)
    const startPage = useMemo(() => Math.floor((currentPage - 1) / 10) * 10 + 1, [currentPage]);
    const endPage = useMemo(() => Math.min(startPage + 9, totalPages), [startPage, totalPages]);

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [startPage, endPage]);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // 이전 10페이지로 이동
    const handlePrevGroup = () => { if (startPage > 1) setCurrentPage(startPage - 10); };

    // 다음 10페이지로 이동
    const handleNextGroup = () => { if (endPage < totalPages) setCurrentPage(endPage + 1); };

    // 정렬 핸들러
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    // 정렬 아이콘 렌더링
    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4">예약 완료 리스트</h2>

            {/* 에러 메시지 표시 */}
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            {/* 검색 컴포넌트 */}
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
            />

            {/* 로딩 상태 표시 */}
            {loading ? (
                <div className="d-flex justify-content-center my-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
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
                                    <td className="text-center">{reservation.cancelDate}</td>
                                    <td className="text-left">{reservation.cancelReason}</td>
                                    <td className="text-right">{reservation.payment}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" className="text-center">검색 결과가 없습니다.</td>
                            </tr>
                        )}
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
                </>
            )}
        </div>
    );
}

export default ResList;

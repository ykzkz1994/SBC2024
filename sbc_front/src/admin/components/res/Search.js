// src/admin/components/res/Search.js

import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Search 컴포넌트
 * @param {string} searchTerm - 현재 검색어
 * @param {function} setSearchTerm - 검색어를 업데이트하는 함수
 * @param {string} selectedColumn - 현재 선택된 검색 조건 컬럼
 * @param {function} setSelectedColumn - 검색 조건 컬럼을 업데이트하는 함수
 */
const Search = ({ searchTerm, setSearchTerm, selectedColumn, setSelectedColumn }) => {
    const columns = [
        { value: 'reservationNumber', label: '예약 번호' },
        { value: 'reservationDate', label: '예약 날짜' },
        { value: 'zoneName', label: '예약 구역 이름' },
        { value: 'memberName', label: '회원 이름' },
        { value: 'memberPhone', label: '회원 전화번호' },
        { value: 'userName', label: '이용자명' },
        { value: 'userPhone', label: '이용자 전화번호' },
        { value: 'checkInDate', label: '입실 날짜' },
        { value: 'checkOutDate', label: '퇴실 날짜' },
        { value: 'cancelDate', label: '취소 날짜' },
        { value: 'cancelReason', label: '취소 사유' },
        { value: 'payment', label: '결제금액' },
    ];

    return (
        <div className="d-flex align-items-center mb-4">
            {/* 컬럼 선택 드롭다운 크기 조정 */}
            <Form.Select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="me-2"
                style={{ width: '150px' }} // 원하는 너비로 설정
            >
                {columns.map((column) => (
                    <option key={column.value} value={column.value}>
                        {column.label}
                    </option>
                ))}
            </Form.Select>

            {/* 검색 입력창 크기 조정 */}
            <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="me-2"
                style={{ width: '200px' }} // 원하는 너비로 설정
            />
        </div>
    );
};

// PropTypes 정의
Search.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    selectedColumn: PropTypes.string.isRequired,
    setSelectedColumn: PropTypes.func.isRequired,
};

export default Search;

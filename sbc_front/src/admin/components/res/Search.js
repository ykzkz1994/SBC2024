// src/admin/components/common/Search.js

import React from 'react';

const Search = ({ searchTerm, setSearchTerm, selectedColumn, setSelectedColumn, onSearch }) => {
    const columns = [
        { value: 'resID', label: '예약 번호' },
        { value: 'checkinDate', label: '예약 날짜' },
        { value: 'memberName', label: '회원 이름' },
        // 필요한 컬럼들을 추가합니다.
    ];

    return (
        <div className="flex items-center mb-4"> {/* 한 줄로 정렬 */}
            {/* 컬럼 선택 드롭다운 */}
            <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="p-2 border rounded-l"
            >
                {columns.map((column) => (
                    <option key={column.value} value={column.value}>
                        {column.label}
                    </option>
                ))}
            </select>

            {/* 검색 입력창 */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="p-2 border-t border-b border-r"
                style={{ width: '200px' }} // 너비를 200px로 설정
            />

            
            {/*/!* 검색 버튼  없는게 더 나은듯 바로나와서*!/*/}
            {/*<button*/}
            {/*    onClick={onSearch}*/}
            {/*    className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-700"*/}
            {/*>*/}
            {/*    검색*/}
            {/*</button>*/}
        </div>
    );
};

export default Search;

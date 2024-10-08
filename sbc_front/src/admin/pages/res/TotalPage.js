// src/admin/pages/res/TotalPage.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelList from '../../components/res/CancelList';
import ResList from '../../components/res/ResList';
import TotalList from '../../components/res/TotalList';
import Search from '../../components/res/Search'; // Search 컴포넌트 import

const TotalPage = () => {
    // 컴포넌트 상태 관리
    const [currentComponent, setCurrentComponent] = useState('TotalList');
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

    const navigate = useNavigate();
    const location = useLocation();

    // 컴포넌트 렌더링 함수
    const renderComponent = () => {
        switch (currentComponent) {
            case 'TotalList':
                return <TotalList searchTerm={searchTerm} />;
            case 'ResList':
                return <ResList searchTerm={searchTerm} />;
            case 'CancelList':
                return <CancelList searchTerm={searchTerm} />;
            default:
                return <TotalList searchTerm={searchTerm} />;
        }
    };

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">전체 예약 조회 페이지</h1>



            {/* 컴포넌트 선택 드롭다운 */}
            <div className="flex justify-end mb-4">
                <select
                    value={currentComponent}
                    onChange={(e) => setCurrentComponent(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="TotalList">전체 예약 조회</option>
                    <option value="ResList">예약 완료 조회</option>
                    <option value="CancelList">예약 취소 조회</option>
                </select>
            </div>

            {/* 선택된 컴포넌트 렌더링 */}
            <div className="mt-4 border-t border-gray-300 pt-4">
                {renderComponent()}
            </div>
        </div>
    );
};

export default TotalPage;

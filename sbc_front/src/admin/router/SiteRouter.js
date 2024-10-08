// src/admin/router/SiteRouter.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteManagementPage from '../pages/site/SiteManagementsPage'; // 구역 목록 페이지 컴포넌트


const SiteRouter = () => {
    return (
        <Routes>
            {/* 구역 목록 페이지 경로 */}
            <Route path="/site/list" element={<SiteManagementPage />} />



        </Routes>
    );
};

export default SiteRouter;

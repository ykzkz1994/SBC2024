// src/admin/pages/site/SiteManagementPage.js

import React from 'react';
import SiteManagements from "../../components/site/SiteManagements";
import BasicLayout from "../../layouts/BasicLayout";

const SiteManagementPage = () => {
    return (
        <BasicLayout>
            {/*메뉴도 필요 없을 듯 <SiteMenu/>*/}
            <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">구역 관리 페이지</h1>

                {/* SiteManagements 컴포넌트 렌더링 */}
                <div className="mt-4 border-t border-gray-300 pt-4">
                    <SiteManagements/>
                </div>
            </div>
        </BasicLayout>

    );
};

export default SiteManagementPage;

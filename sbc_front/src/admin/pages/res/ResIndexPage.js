import React from 'react';
import {useCallback} from "react";
import BasicLayout from "../../layout/BasicLayout";
import {Outlet, useNavigate} from 'react-router-dom';
import ResMenu from "../../components/menus/ResMenu";
import CommunityMenu from "../../components/menus/CommunityMenu";

const ResIndexPage = () => {




    return (
        <BasicLayout>
            <ResMenu></ResMenu>
            <div>


                <div className="flex flex-wrap w-full">
                    {/* 자식 라우트의 컴포넌트가 여기에 렌더링됩니다 */}
                    <Outlet/>
                </div>
            </div>
        </BasicLayout>
    );
};

export default ResIndexPage;

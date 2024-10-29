import React from 'react';
import {Outlet} from "react-router-dom";
import CommunityMenu from "../../layouts/CommunityMenu";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomLogin from "../../hooks/useCustomLogin";



const ReviewIndexPage = () => {

    // 로그인 여부 확인
    const {isLogin, moveToLoginReturn} = useCustomLogin()
    if(!isLogin){
        alert('회원만 이용가능합니다.');
        return moveToLoginReturn()
    }

    return (
        <BasicLayout>
            <div>
                <CommunityMenu/>
            </div>
            <div className="mt-3"><h1>리뷰 게시판</h1></div>
            <hr/>
            <div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
};

export default ReviewIndexPage;
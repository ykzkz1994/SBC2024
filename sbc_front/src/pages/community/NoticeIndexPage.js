import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../layouts/CommunityMenu";
import ListComponent from "../../admin/components/notice/ListComponent";

const NoticeIndexPage = () =>{
    return(
        <BasicLayout>
            <CommunityMenu/>
            <div>
                <div>
                    <div><h1>공지 게시판</h1></div>
                    <hr/>
                </div>
                <div>
                    <Outlet/>
                </div>

            </div>
        </BasicLayout>
    );
}

export default NoticeIndexPage;
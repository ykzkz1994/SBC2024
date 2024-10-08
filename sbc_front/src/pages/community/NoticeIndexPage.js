import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../layouts/CommunityMenu";

const NoticeIndexPage = () =>{
    return(
        <BasicLayout>
            <CommunityMenu/>
            <div>
                <div> Notice Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default NoticeIndexPage;
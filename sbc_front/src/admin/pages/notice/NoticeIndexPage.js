import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import CommunityMenu from "../../components/menus/CommunityMenu";

const NoticeIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <CommunityMenu/>
            </div>
            <div>
                <div> Notice Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default NoticeIndexPage;
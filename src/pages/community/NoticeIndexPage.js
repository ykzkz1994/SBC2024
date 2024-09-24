import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import NoticeMenu from "../../layouts/NoticeMenu";

const NoticeIndexPage = () =>{
    return(
        <BasicLayout>
            <NoticeMenu/>
            <div>
                <div> Notice Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default NoticeIndexPage;
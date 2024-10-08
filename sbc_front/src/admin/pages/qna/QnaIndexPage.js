import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import CommunityMenu from "../../components/menus/CommunityMenu";

const QnaIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <CommunityMenu/>
            </div>
            <div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default QnaIndexPage;
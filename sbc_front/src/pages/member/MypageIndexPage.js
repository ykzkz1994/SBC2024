import BasicLayout from "../../layouts/BasicLayout";
import MypageMenu from "../../layouts/MypageMenu";
import {Outlet} from "react-router-dom";

const MypageIndexPage = () => {
    return(
        <BasicLayout>
            <MypageMenu/>
            <div>
                <Outlet/>
            </div>

        </BasicLayout>
    );
}

export default MypageIndexPage;
import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import MemberMenu from "../../components/menus/MemberMenu";

const MemberIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <MemberMenu/>
            </div>
            <div>
                <div> Member Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default MemberIndexPage;
import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import StatsMenu from "../../components/menus/StatsMenu";

const StatsIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <StatsMenu/>
            </div>
            <div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default StatsIndexPage;
import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import SiteMenu from "../../components/menus/SiteMenu";

const SiteIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <SiteMenu/>
            </div>
            <div>
                <div> Site Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default SiteIndexPage;
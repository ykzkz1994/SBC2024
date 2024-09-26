import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import ResMenu from "../../components/menus/ResMenu";

const ResIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <ResMenu/>
            </div>
            <div>
                <div> Res Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default ResIndexPage;
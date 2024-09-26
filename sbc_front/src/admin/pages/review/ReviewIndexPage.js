import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import CommunityMenu from "../../components/menus/CommunityMenu";

const ReviewIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <CommunityMenu/>
            </div>
            <div>
                <div> Review Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default ReviewIndexPage;
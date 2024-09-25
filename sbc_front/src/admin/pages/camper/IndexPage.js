import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";

const IndexPage = () => {

    const navigate = useNavigate()

    

return(
    <BasicLayout> 
        <div style={{backgroundColor:'orange', height: '800px'}}>
            <div> camper게시판 테스트 (인덱스) </div>
            <div style={{backgroundColor:'white', height: '200px'}}>
                <Outlet/>
            </div>
        </div>
        </BasicLayout> 
);

}

export default IndexPage;
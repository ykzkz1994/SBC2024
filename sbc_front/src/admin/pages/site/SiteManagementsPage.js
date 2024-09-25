import {Outlet,useNavigate} from "react-router-dom";
import SiteManagements from '../../components/site/SiteManagements'; //해당 페이지에서 보여줄 components import (구역관리 컴포넌트 )
import {Link} from "react-router-dom";
//클릭하면 컴포넌트를 교체하려고했으나 링크는 페이지 교체라 아마 {useState}를 사용해서 컴포넌트만 교체 할 것 같음
import BasicLayout from "../../layout/BasicLayout";

//함수
const SiteManagementsPage = () => {



    return (
        <BasicLayout>
            <div className="text-3xl">
                <button className>
                    <Link to={'/'}>이렇게?</Link>
                </button>

                <SiteManagements/>
            </div>
        </BasicLayout>


    );
};

export default SiteManagementsPage;

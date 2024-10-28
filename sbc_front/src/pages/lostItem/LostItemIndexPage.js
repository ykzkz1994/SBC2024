import "../../css/lostItem.css"
import {Outlet} from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../layouts/CommunityMenu";

const LostItemIndexPage = () => {


    return (
        <>
            <BasicLayout>
                <CommunityMenu/>
                <div className="my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 space-y-0">
                    <aside className="md:w-1/5 lg:w-1/5 px-4 py-10 aside-box">
                        <div>전체</div>
                        <div>보관중</div>
                        <div>수령완료</div>
                    </aside>
                    <main className="md:w-2/3 lg:w-3/4 px-5">
                        <Outlet/>
                    </main>
                </div>

            </BasicLayout>
        </>
    );

}

export default LostItemIndexPage;
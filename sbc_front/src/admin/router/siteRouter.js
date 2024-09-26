import {lazy, Suspense} from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading . . .</div>
const SiteManagements = lazy(() => import("../pages/site/SiteManagementsPage.js"));

const siteRouter = () => {
    return[


        { //디폴트 페이지 1개뿐
            path: "",
            element: <Suspense fallback={Loading}><SiteManagements/></Suspense>
        },
        { //리다이렉션
            path: "*",
            element: <Suspense fallback={Loading}><SiteManagements/></Suspense>
        },

    ]
}

export default siteRouter;
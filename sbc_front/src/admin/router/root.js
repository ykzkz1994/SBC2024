//root.js는 createBrowserRouter를 통해서 어떤 컴포넌트를 보여줄 것인지 결정한다

import { Suspense, lazy } from "react";
import SiteManagementsPage from "../pages/site/SiteManagementsPage";
import TotalPage from "../pages/res/TotalPage";
import DateSitePage from "../pages/res/DateSitePage";
import { createBrowserRouter } from "react-router-dom";



const Loading = <div>Loading....</div>




//지연로딩을 하는 리액트 지원함수 lazy =>미리 로딩하지않고 필요 할 때 로딩하여 초기 로딩 시간을 개선하여 사용 경험을 좋게만듦
const Main = lazy(() => import("../pages/MainPage.js"))
const site = lazy(() => import("../pages/site/SiteManagementsPage.js"))
const res = lazy(() => import("../pages/res/TotalPage.js"))



const root = createBrowserRouter([
    {//메인페이지 라우터
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    
    { //구역관리 페이지 라우터
        path: "site",
        element: <Suspense fallback={Loading}><SiteManagementsPage/></Suspense>
    },

    { //예약리스트 페이지 라우터
        path: "res/total",
        element: <Suspense fallback={Loading}><TotalPage/></Suspense>
    },

    { //예약리스트 달력형  페이지 라우터
        path: "res/datesite",
        element: <Suspense fallback={Loading}><DateSitePage/></Suspense>
    },

    { //공지사항 페이지 라우터
        path: "notice",
        element: <Suspense fallback={Loading}><SiteManagementsPage/></Suspense>
    }
    ])
export default root;
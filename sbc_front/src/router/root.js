import { Suspense, lazy } from "react";
import CampingInfoRouter from "./CampingInfoRouter";
import NoticeRouter from "./NoticeRouter";
import ResRouter from "./ResRouter";
import Spinner from 'react-bootstrap/Spinner';
import MypageRouter from "./MypageRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <Spinner animation="border" />;
const Main = lazy(() => import("../pages/MainPage"))
const Campingindex = lazy(() => import("../pages/campinginfo/CampingIndexPage"))
const ResIndex = lazy(() => import("../pages/reservation/ResIndexPage"))
const NoticeIndex = lazy(() => import("../pages/community/NoticeIndexPage"))
const Login = lazy(() => import("../pages/common/LoginPage"))
const MyPageIndex = lazy(() => import("../pages/member/MypageIndexPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "login",
        element: <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path: "camping",
        element: <Suspense fallback={Loading}><Campingindex/></Suspense>,
        children: CampingInfoRouter()
    },
    {
        path: "res",
        element: <Suspense fallback={Loading}><ResIndex/></Suspense>,
        children: ResRouter()
    },
    {
        path: "notice",
        element: <Suspense fallback={Loading}><NoticeIndex/></Suspense>,
        children: NoticeRouter()
    },
    {
        path: "mypage",
        element: <Suspense fallback={Loading}><MyPageIndex/></Suspense>,
        children : MypageRouter()
    }
])

export default root;
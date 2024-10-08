import { Suspense, lazy } from "react";
import CampingInfoRouter from "./CampingInfoRouter";
import NoticeRouter from "./NoticeRouter";
import ResRouter from "./ResRouter";
import Spinner from 'react-bootstrap/Spinner';
import MypageRouter from "./MypageRouter";
import {Navigate} from "react-router-dom";
import joinRouter from "./JoinRouter";
import CamperRouter from "./CamperRouter";


const { createBrowserRouter } = require("react-router-dom");

const Loading = <Spinner animation="border" />;
const Main = lazy(() => import("../pages/MainPage"))
const Campingindex = lazy(() => import("../pages/campinginfo/CampingIndexPage"))
const ResIndex = lazy(() => import("../pages/reservation/ResIndexPage"))
const NoticeIndex = lazy(() => import("../pages/community/NoticeIndexPage"))
const Login = lazy(() => import("../pages/common/LoginPage"))
const Join = lazy(() => import("../pages/member/JoinIndexPage"))
const FindPw = lazy(() => import("../pages/member/FindPwPage"))
const FIndEmail = lazy(() => import("../pages/member/FindEmailPage"))
const MyPageIndex = lazy(() => import("../pages/member/MypageIndexPage"))
const CamperIndex = lazy(() =>  import("../pages/campers/CamperIndexPage"))


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
        path: "logout",
        element: <Navigate replace to="/"/>
    },
    {
        path: "findpw",
        element: <Suspense fallback={Loading}><FindPw/></Suspense>
    },
    {
        path: "findemail",
        element: <Suspense fallback={Loading}><FIndEmail/></Suspense>
    },
    {
      path: "join",
      element: <Suspense fallback={Loading}><Join/></Suspense>,
      children: joinRouter()
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
    },
    {
        path: "campers",
        element: <Suspense fallback={Loading}><CamperIndex/></Suspense>,
        children: CamperRouter()
    }
])

export default root;
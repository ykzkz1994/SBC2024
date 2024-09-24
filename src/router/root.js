import { Suspense, lazy } from "react";
import CampingInfoRouter from "./CampingInfoRouter";
import NoticeRouter from "./CommunityRouther";
import ResRouter from "./ResRouter";
import LoginPage from "../pages/common/LoginPage";
import Spinner from 'react-bootstrap/Spinner';

const { createBrowserRouter } = require("react-router-dom");

const Loading = <Spinner animation="border" />;
const Main = lazy(() => import("../pages/MainPage"))
const Campingindex = lazy(() => import("../pages/campinginfo/CampingIndexPage"))
const ResIndex = lazy(() => import("../pages/reservation/ResIndexPage"))
const NoticeIndex = lazy(() => import("../pages/community/NoticeIndexPage"))
const Login = lazy(() => import("../pages/common/LoginPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "login",
        element: <Suspense fallback={Loading}><LoginPage/></Suspense>
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
    }
])

export default root;
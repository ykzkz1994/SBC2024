import {Suspense, lazy} from "react";
import { createBrowserRouter } from "react-router-dom"; 
import Spinner from 'react-bootstrap/Spinner';
import siteRouter from "../router/siteRouter";
import memberRouter from "../router/memberRouter";
import camperRouter from "../router/camperRouter";
import noticeRouter from "../router/noticeRouter";
import statsRouter from "../router/statsRouter";
import reviewRouter from "../router/reviewRouter";
import qnaRouter from "../router/qnaRouter";
import resRouter from "../router/resRouter";


const Loading = <Spinner animation="border"/>
const Main = lazy(()=> import("../pages/MainPage"))
const MemberIndex = lazy(()=> import("../pages/member/MemberIndexPage"))
const ResIndex = lazy(()=>import("../pages/res/ResIndexPage"))
const StatsIndex = lazy(()=>import("../pages/stats/StatsIndexPage"))
const Site = lazy(()=>import("../pages/site/SiteManagementPage"))

// 커뮤니티
const CamperIndex = lazy(() => import("../pages/camper/CamperIndexPage"))
const NoticeIndex = lazy(()=> import("../pages/notice/NoticeIndexPage"))
const QnaIndex = lazy(()=> import("../pages/qna/QnaIndexPage"))
const ReviewIndex = lazy(()=> import("../pages/review/ReviewIndexPage"))

// 주소
const prefix = "api/admin/"

const root = createBrowserRouter([
   
    {
        path : `${prefix}`,
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: `${prefix}site/`,
        element: <Suspense fallback={Loading}><Site/></Suspense>,
        children: siteRouter()
    },
    {
        path: `${prefix}res/`,
        element: <Suspense fallback={Loading}><ResIndex/></Suspense>,
        children: resRouter()
    },
    {
        path: `${prefix}member/`,
        element: <Suspense fallback={Loading}><MemberIndex/></Suspense>,
        children: memberRouter()
    },
    {
        path: `${prefix}campers/`,
        element: <Suspense fallback={Loading}><CamperIndex/></Suspense>,
        children: camperRouter()
    },
    {
        path: `${prefix}notices/`,
        element: <Suspense fallback={Loading}><NoticeIndex/></Suspense>,
        children: noticeRouter()
    },
    {
        path: `${prefix}qnas/`,
        element: <Suspense fallback={Loading}><QnaIndex/></Suspense>,
        children: qnaRouter()
    },
    {
        path: `${prefix}reviews/`,
        element: <Suspense fallback={Loading}><ReviewIndex/></Suspense>,
        children: reviewRouter()
    },
    {
        path: `${prefix}stats/`,
        element: <Suspense fallback={Loading}><StatsIndex/></Suspense>,
        children: statsRouter()
    }


])

export default root;
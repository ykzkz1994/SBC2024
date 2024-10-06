//root.js는 createBrowserRouter를 통해서 어떤 컴포넌트를 보여줄 것인지 결정한다

import {Suspense, lazy} from "react";
import Spinner from 'react-bootstrap/Spinner';

import memberRouter from "./MemberRouter";
import camperRouter from "../router/camperRouter";
import noticeRouter from "../router/noticeRouter";
import statsRouter from "../router/StatsRouter";
import reviewRouter from "../router/reviewRouter";
import qnaRouter from "../router/qnaRouter";
import resRouter from "./resRouter";

import {createBrowserRouter} from "react-router-dom";
import SiteManagementsPage from "../pages/site/SiteManagementsPage";





//지연로딩을 하는 리액트 지원함수 lazy =>미리 로딩하지않고 필요 할 때 로딩하여 초기 로딩 시간을 개선하여 사용 경험을 좋게만듦
//메인페이지
const Main = lazy(() => import("../pages/MainPage.js"))
//구역관리페이지
const Site = lazy(() => import("../pages/site/SiteManagementsPage.js"))
//예약 인덱스 페이지(전체/취소/예약은 인덱스페이지 안에서 Outlet으로 분류됨 )

const ResIndex = lazy(() => import("../pages/res/ResIndexPage.js"))
const Loading = <Spinner animation="border"/>
const MemberIndex = lazy(() => import("../pages/member/MemberIndexPage"))
const StatsIndex = lazy(() => import("../pages/stats/StatsIndexPage"))

// 커뮤니티
const CamperIndex = lazy(() => import("../pages/camper/CamperIndexPage"))
const NoticeIndex = lazy(() => import("../pages/notice/NoticeIndexPage"))
const QnaIndex = lazy(() => import("../pages/qna/QnaIndexPage"))
const ReviewIndex = lazy(() => import("../pages/review/ReviewIndexPage"))

// 주소
const prefix = "api/admin/"

const root = createBrowserRouter([
    {//메인페이지 라우터
        path: `/`,
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },

    {//위에서 선언한 lazy지연기능이 포함된 페이지 이동 함수
        //예약관리의 기본경로 자식은 resRouter
        //경로가 하나라 라우터 필요 x
        path: `site`,
        element: <Suspense fallback={Loading}><Site/></Suspense>,


    },
    {//root 페이지 위에서 선언한 lazy지연기능이 포함된 페이지 이동 함수
        //예약관리의 기본경로 자식은 resRouter
        path: `res`,
        element: <Suspense fallback={Loading}><ResIndex/></Suspense>,
        children: resRouter()

    },
    { // 기타 모든 경로에 대한 404 페이지
        path: "*",
        element: <div>404 페이지를 찾을 수 없습니다.</div>
    },
    {
        path: `member`,
        element: <Suspense fallback={Loading}><MemberIndex/></Suspense>,
        children: memberRouter()
    },
    {
        path: `${prefix}campers/`,
        element: <Suspense fallback={Loading}><CamperIndex/></Suspense>,
        children: camperRouter()
    },
    {
        path: `notice`,
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
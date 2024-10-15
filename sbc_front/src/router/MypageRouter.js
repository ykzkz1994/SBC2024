import {lazy, Suspense} from "react";
import { Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const Loading = <Spinner animation="border" />;
const MypageMemberInfo = lazy(() => import("../pages/member/MypageMemberInfoPage"));
const MyPageRes = lazy(() => import("../pages/member/MyPageResPage"));
const MypageResDetail = lazy(() => import("../pages/member/MypageResDetailPage"))
const AuthPw = lazy(() => import("../pages/member/MypageAuthPwPage"));

const MypageRouter = () => {
    return[
        {
            path: "",
            element : <Navigate replace to="res"/>
        },
        {
            path: "res",
            element : <Suspense fallback={Loading}><MyPageRes/></Suspense>
        },
        {
            path: "detail",
            element: <Suspense fallback={Loading}><MypageResDetail/></Suspense>
        },
        {
            path: "info",
            element: <Suspense fallback={Loading}><MypageMemberInfo/></Suspense>
        },
        {
            path: "authpw",
            element: <Suspense fallback={Loading}><AuthPw/></Suspense>
        },

    ]
}

export default MypageRouter;
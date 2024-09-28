import {lazy, Suspense} from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading . . .</div>
const MypageMemberInfo = lazy(() => import("../pages/member/MypageMemberInfoPage"));
const MyPageRes = lazy(() => import("../pages/member/MyPageResPage"));

const MypageRouter = () => {
    return[
        {
            path: "",
            element : <Navigate replace to="resdetail"/>
        },
        {
            path: "resdetail",
            element : <Suspense fallback={Loading}><MyPageRes/></Suspense>
        },
        {
            path: "info",
            element: <Suspense fallback={Loading}><MypageMemberInfo/></Suspense>
        }
    ]
}

export default MypageRouter;
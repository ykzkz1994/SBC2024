import {createBrowserRouter} from "react-router-dom"
import { Suspense, lazy } from "react"
import camperRouter from "../router/camperRouter"

// 컴포넌트 처리가 끝나지 않았을때 하면에 보여지는 메시지
const Loading = <div>Loading....</div> 

const Main = lazy(()=> import("../../admin/pages/MainPage"))
const Member = lazy(()=> import("../pages/MemberPage"))
const CamperIndex = lazy(()=> import("../pages/camper/IndexPage"))

const root = createBrowserRouter([
    {
        path : "/api/admin",
        element : <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path : "/api/admin/members",
        element : <Suspense fallback={Loading}><Member/></Suspense>
    },
    {
        path : "/api/admin/campers",
        element: <Suspense fallback={Loading}><CamperIndex/></Suspense>,
        children: camperRouter()
    }
])

export default root;
import { Suspense, lazy } from "react"
import {Navigate} from "react-router-dom"

// 컴포넌트 처리가 끝나지 않았을때 하면에 보여지는 메시지
const Loading = <div>Loading....</div> 
const CamperList = lazy(()=> import("../pages/camper/ListPage"))
const CamperRead = lazy(()=> import("../pages/camper/ReadPage"))
const CamperAdd = lazy(()=> import("../pages/camper/AddPage"))
const CamperModify = lazy(()=> import("../pages/camper/ModifyPage"))

const camperRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><CamperList/></Suspense>
        },
        {
            path: "",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:cbno",
            element: <Suspense fallback={Loading}><CamperRead/></Suspense>
        },
        {
            path: "add",
            element : <Suspense fallback={Loading}><CamperAdd/></Suspense>
        },
        {
            path: "modify/:cbno",
            element: <Suspense fallback={Loading}><CamperModify/></Suspense>
        }
    ]
}

export default camperRouter;
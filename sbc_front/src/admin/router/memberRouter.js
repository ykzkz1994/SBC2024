import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const Loading = <Spinner animation="border"/>
const Total = lazy(() => import("../components/member/TotalListComponent"))
const Inactive = lazy(()=> import("../components/member/InactiveListComponent"))


const memberRouter = () => {
    return[
        {
            path: "totallist",
            element : <Suspense fallback={Loading}><Total/></Suspense>
        },
        {
            path: "",
            element: <Navigate replace to="totallist"/>
        },
        {
            path: "inactivelist",
            element : <Suspense fallback={Loading}><Inactive/></Suspense>
        }
    ]
}

export default memberRouter;
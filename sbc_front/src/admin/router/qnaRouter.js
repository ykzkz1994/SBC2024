import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const Loading = <Spinner animation="border"/>
const QnaList = lazy(()=> import("../pages/qna/ListPage"))
const QnaRead = lazy(()=> import("../pages/qna/ReadPage"))
const QnaAdd = lazy(() => import("../pages/qna/AddPage"))
const QnaModify = lazy(()=>import("../pages/qna/ModifyPage"))

const qnaRouter = () => {
    return[
        {
            path: "",
            element : <Navigate replace to="list"/>
        },
        {
            path: "list",
            element : <Suspense fallback={Loading}><QnaList/></Suspense>,

        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><QnaAdd/></Suspense>
        },
        {
            path: "read/:qbID",
            element: <Suspense fallback={Loading}><QnaRead/></Suspense> 
        },
        {
            path: "modify/:qbID",
            element: <Suspense fallback={Loading}><QnaModify/></Suspense> 
        }
    ]
}

export default qnaRouter;
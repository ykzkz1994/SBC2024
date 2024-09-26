import { Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading . . .</div>

const noticeRouter = () => {
    return[
        {
            path: "",
            element : <Navigate replace to="/api/admin/notices"/>
        },
    ]
}

export default noticeRouter;
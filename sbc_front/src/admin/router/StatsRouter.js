import { Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading . . .</div>

const statsRouter = () => {
    return[
        {
            path: "*",
            element : <Navigate replace to="notice"/>
        },
    ]
}

export default statsRouter;
import { Suspense, lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/MainPage.js"))
const site = lazy(() => import("../pages/site/SiteManagementsPage.js"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "site",
        element: <Suspense fallback={Loading}><site/></Suspense>
    }
    ])
export default root;
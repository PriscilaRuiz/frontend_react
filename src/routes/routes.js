import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { Error404 } from "../Paginas";
import { BasicLayout } from "../Layouts";

const routes = [
    ...routesAdmin, 
    ...routesClient, 
    {
    layout: BasicLayout,
    component: Error404,
    },
];
export default routes;
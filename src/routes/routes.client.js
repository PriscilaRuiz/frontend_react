import { ClientLayout } from "../Layouts";
import { Home } from "../Paginas/Client";

const routesClient = [
    {
        path: "/",
        layout: ClientLayout,
        component: Home,
    },
];

export default routesClient;
import { AdminLayout } from "../Layouts";
import { OrderAdmin, UsersAdmin, CategoriesAdmin, ProductAdmin, TablesAdmin, TableDetailsAdmin } from "../Paginas/Admin"
const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: OrderAdmin,
    },
    {
        path: "/admin/users",
        layout: AdminLayout,
        component: UsersAdmin,
    },
    {
        path: "/admin/categories",
        layout: AdminLayout,
        component: CategoriesAdmin,
    },
    {
        path: "/admin/products",
        layout: AdminLayout,
        component: ProductAdmin,
    },
    {
        path: "/admin/tables",
        layout: AdminLayout,
        component: TablesAdmin,
    },
    {
        path: "/admin/table/:id",
        layout: AdminLayout,
        component: TableDetailsAdmin,
      },
];

export default routesAdmin;
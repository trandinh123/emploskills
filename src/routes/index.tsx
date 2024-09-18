import {createBrowserRouter} from "react-router-dom";
import projectManagementRoutes from "./projectMangementRoutes";

const router = createBrowserRouter([{path: "/", children: [...projectManagementRoutes]}]);

export default router;

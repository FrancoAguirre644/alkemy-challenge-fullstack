import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistertPage from "../pages/RegisterPage";
import { ClientRoutes } from './clientRoutes';

const routes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes not requiring Login */}
                <Route path={ClientRoutes.LOGIN} element={<LoginPage />} />
                <Route path={ClientRoutes.REGISTER} element={<RegistertPage />} />

                {/* Protected route requiring route, otherwise Navigates to Login */}
                <Route path={ClientRoutes.HOME} element={<ProtectedRoute />}>
                    <Route path={ClientRoutes.HOME} element={<HomePage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default routes;
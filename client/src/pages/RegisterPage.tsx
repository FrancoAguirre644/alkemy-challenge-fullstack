import React from "react";
import { Box, Container } from '@mui/material';
import { Layout } from "../components/Layout";
import RegisterForm from "../components/auth/RegisterForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { ClientRoutes } from "../routes/clientRoutes";

const RegisterPage: React.FC = () => {

    const { auth } = useSelector((state: RootState) => state);

    if (auth.access_token) return <Navigate to={ClientRoutes.HOME} />

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <RegisterForm />
                </Container>
            </Box>
        </Layout>
    );
}

export default RegisterPage;
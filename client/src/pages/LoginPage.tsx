import React from "react";
import { Box, Container } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { Layout } from "../components/Layout";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { ClientRoutes } from "../routes/clientRoutes";


const LoginPage: React.FC = () => {

    const { auth } = useSelector((state: RootState) => state);

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 2
                }}
            >
                <Container maxWidth="sm">
                    <LoginForm />
                </Container>
            </Box>
        </Layout>
    );
}

export default LoginPage;
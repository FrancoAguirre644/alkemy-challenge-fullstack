import React from "react";
import { Box, Container } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { Layout } from "../components/Layout";

const LoginPage: React.FC = () => {

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
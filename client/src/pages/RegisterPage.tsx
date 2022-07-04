import React from "react";
import { Box, Container } from '@mui/material';
import { Layout } from "../components/Layout";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage: React.FC = () => {

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
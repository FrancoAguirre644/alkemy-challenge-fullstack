import { Box, Button, ButtonGroup, Card, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import OperationsTable from "../components/OperationsTable";
import { RootState } from "../redux/store";

const HomePage: React.FC = () => {

    const { operations } = useSelector((state: RootState) => state);

    const buttons = [
        <Button key="one">All</Button>,
        <Button key="two">Income</Button>,
        <Button key="three">Expense</Button>,
    ];

    return (
        <Layout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup size="small" color="secondary" aria-label="small button group">
                    {buttons}
                </ButtonGroup>
            </Box>
            <OperationsTable operations={operations.data!} />
        </Layout>
    )
}

export default HomePage;
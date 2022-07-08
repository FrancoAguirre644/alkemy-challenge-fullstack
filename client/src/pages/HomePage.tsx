import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import OperationsTable from "../components/OperationsTable";
import { AppDispatch, RootState } from "../redux/store";
import { deleteOperation } from '../redux/slices/operationSlice';

const HomePage: React.FC = () => {

    const { operations } = useSelector((state: RootState) => state);

    const dispatch = useDispatch<AppDispatch>();

    const buttons = [
        <Button key="one">All</Button>,
        <Button key="two">Income</Button>,
        <Button key="three">Expense</Button>,
    ];

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this operation?')) {
            dispatch(deleteOperation(id));
        }
    }

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
            <OperationsTable operations={operations.data!} handleDelete={handleDelete} />
        </Layout>
    )
}

export default HomePage;
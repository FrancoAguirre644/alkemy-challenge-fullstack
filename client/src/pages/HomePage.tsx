import { Box, Button, ButtonGroup, Card, CardActions, CardContent } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import OperationsTable from "../components/OperationsTable";
import { AppDispatch, RootState } from "../redux/store";
import { createOperation, deleteOperation } from '../redux/slices/operationSlice';
import AddOperationDialog from "../components/AddOperationDialog";
import { IOperation } from "../models";

const HomePage: React.FC = () => {

    const { operations } = useSelector((state: RootState) => state);

    const dispatch = useDispatch<AppDispatch>();

    const [typeFilter, setTypeFilter] = useState<string>("all");

    const buttons = [
        <Button
            key="all"
            variant={typeFilter == "all" ? "contained" : "outlined"}
            onClick={() => setTypeFilter("all")}
        >
            All
        </Button>,
        <Button
            key="income"
            variant={typeFilter == "income" ? "contained" : "outlined"}
            onClick={() => setTypeFilter("income")}
        >
            Income
        </Button>,
        <Button
            key="expense"
            variant={typeFilter == "expense" ? "contained" : "outlined"}
            onClick={() => setTypeFilter("expense")}
        >
            Expense
        </Button>
    ];

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this operation?')) {
            dispatch(deleteOperation(id));
        }
    }

    const handleCreate = (operation: IOperation) => {
        dispatch(createOperation(operation));
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
                    width: 1
                }}
                p={2}
            >
                <Card sx={{ width: 1 }}>
                    <CardContent>
                        <ButtonGroup size="small" color="secondary" aria-label="small button group">
                            {buttons}
                        </ButtonGroup>
                    </CardContent>
                </Card>
                <AddOperationDialog title="Add Operation" handleCreate={handleCreate} />
                <OperationsTable operations={operations.data!} handleDelete={handleDelete} typeFilter={typeFilter} />
            </Box>
        </Layout>
    )
}

export default HomePage;
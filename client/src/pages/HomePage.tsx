import { Box, Button, ButtonGroup, Card, CardContent, Divider, List, ListItemSecondaryAction, ListItemText, ListItemButton, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import OperationsTable from "../components/OperationsTable";
import { AppDispatch, RootState } from "../redux/store";
import { createOperation, deleteOperation, updateOperation } from '../redux/slices/operationSlice';
import AddOrUpdateOperationDialog from "../components/AddOrUpdateOperationDialog";
import { IOperation } from "../models";

const HomePage: React.FC = () => {

    const { operations } = useSelector((state: RootState) => state);

    const dispatch = useDispatch<AppDispatch>();

    const [income, setIncome] = useState<number>(0);

    const [outcome, setOutcome] = useState<number>(0);

    const [total, setTotal] = useState<number>(0);

    const [typeFilter, setTypeFilter] = useState<string>("all");

    useEffect(() => {
        if (operations.data?.length) {
            calculateTotal(operations.data);
        }
    }, [operations.data]);

    const calculateTotal = (operations: IOperation[]) => {
        let incomeSubTotal = 0;
        let outcomeSubTotal = 0;

        const total = operations.map((operation) => {

            if (operation.type === "income") {
                incomeSubTotal += operation.amount;
                return operation.amount;
            }

            outcomeSubTotal += operation.amount;
            return operation.amount;

        });

        setIncome(incomeSubTotal);

        setOutcome(outcomeSubTotal);

        setTotal(total.reduce((a, b) => a + b));
    };

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

    const handleCreateOrUpdate = (operation: IOperation) => {
        if (operation.id) {
            dispatch(updateOperation(operation));
        } else {
            dispatch(createOperation(operation));
        }
    }

    if (operations.loading) return (
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
                <CircularProgress />
            </Box>
        </Layout>
    )


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
                        <AddOrUpdateOperationDialog
                            title="Add Operation"
                            handleCreateOrUpdate={handleCreateOrUpdate}
                        />
                        <List dense>
                            <ListItemButton>
                                <ListItemText primary="Income:" />
                                <ListItemSecondaryAction>
                                    ${income.toFixed(2)}
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemText primary="Expense:" />
                                <ListItemSecondaryAction >
                                    ${outcome.toFixed(2)}
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemText primary="Total:" />
                                <ListItemSecondaryAction >
                                    ${total.toFixed(2)}
                                </ListItemSecondaryAction>
                            </ListItemButton>
                        </List>
                    </CardContent>
                </Card>
                <OperationsTable
                    operations={operations.data!}
                    handleDelete={handleDelete}
                    handleCreateOrUpdate={handleCreateOrUpdate}
                    typeFilter={typeFilter}
                />
            </Box>
        </Layout>
    )
}

export default HomePage;
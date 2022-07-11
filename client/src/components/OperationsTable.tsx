import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IOperation } from '../models';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Chip } from '@mui/material';
import AddOrUpdateOperationDialog from './AddOrUpdateOperationDialog';

interface OperationsTableProps {
    operations: IOperation[];
    handleDelete: (id: number) => void;
    handleCreateOrUpdate: (operation: IOperation) => void;
    typeFilter: string;
}

const OperationsTable: React.FC<OperationsTableProps> = ({ operations, handleDelete, handleCreateOrUpdate, typeFilter }) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
            <Table sx={{ minWidth: 800 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {operations.filter(operation => typeFilter === "all" ? true : operation.type === typeFilter).map(filteredOperation => (
                        <TableRow key={filteredOperation.id}>
                            <TableCell component="th" scope="row" align="left">
                                {filteredOperation.description}
                            </TableCell>
                            <TableCell align="right">${filteredOperation.amount.toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <Chip label={filteredOperation.type}
                                    variant="outlined"
                                    color={
                                        filteredOperation.type == 'income' ?
                                            'success'
                                            :
                                            'error'
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <AddOrUpdateOperationDialog
                                    title="Update Operation"
                                    handleCreateOrUpdate={handleCreateOrUpdate}
                                    operation={filteredOperation}
                                />
                                <DeleteOutlineIcon
                                    color="error"
                                    style={{ 'cursor': 'pointer' }}
                                    onClick={() => handleDelete(filteredOperation.id!)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OperationsTable;
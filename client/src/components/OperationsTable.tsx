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

interface OperationsTableProps {
    operations: IOperation[];
    handleDelete: (id: number) => void;
}

const OperationsTable: React.FC<OperationsTableProps> = ({ operations, handleDelete }) => {
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
                    {operations.map((operation) => (
                        <TableRow key={operation.id}>
                            <TableCell component="th" scope="row">
                                {operation.description}
                            </TableCell>
                            <TableCell align="right">${operation.amount.toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <Chip label={operation.type}
                                    variant="outlined"
                                    color={
                                        operation.type == 'income' ?
                                            'success'
                                            :
                                            'error'
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <DeleteOutlineIcon 
                                    color="error" 
                                    style={{ 'cursor': 'pointer' }} 
                                    onClick={() => handleDelete(operation.id!)}
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
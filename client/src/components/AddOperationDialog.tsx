import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { IOperation } from '../models';

const OperationsTypes = [
    {
        value: 'income',
        label: 'Income'
    },
    {
        value: 'expense',
        label: 'Expense'
    }
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

interface AddOperationDialogProps {
    title: string;
    handleCreate: (operation: IOperation) => void;
}

const AddOperationDialog: React.FC<AddOperationDialogProps> = ({ title, handleCreate }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addOperationSchema = Yup.object().shape({
        description: Yup.string().required('Description is required.'),
        amount: Yup.number().min(1, 'Amount must be greater than or equal to 1').required('Amount is required.'),
        type: Yup.string().required('Type is required.'),
    });

    const formik = useFormik({
        initialValues: {
            description: '',
            amount: 0,
            type: ''
        },
        validationSchema: addOperationSchema,
        onSubmit: () => {
            handleCreate(formik.values);
            formik.setSubmitting(false);
            handleClose();
        }
    });

    return (
        <div>
            <Button variant="outlined" size='small' onClick={handleClickOpen} fullWidth>
                {title}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title}
                </BootstrapDialogTitle>

                <form onSubmit={formik.handleSubmit} noValidate>
                    <DialogContent dividers>
                        <TextField
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            fullWidth
                            helperText={formik.touched.description && formik.errors.description}
                            label="Description"
                            margin="dense"
                            name="description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.amount && formik.errors.amount)}
                            fullWidth
                            helperText={formik.touched.amount && formik.errors.amount}
                            type="number"
                            label="Amount"
                            margin="dense"
                            name="amount"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.amount}
                            variant="outlined"
                        />
                        <FormControl
                            error={Boolean(formik.touched.type && formik.errors.type)}
                            fullWidth
                            margin="normal"
                            onBlur={formik.handleBlur}
                            required
                            variant="outlined"
                        >
                            <InputLabel id="demo-simple-select-standard-label">Operation Type</InputLabel>
                            <Select
                                label="Operation Type"
                                name="type"
                                onChange={formik.handleChange}
                                value={formik.values.type}
                            >
                                <MenuItem value="" disabled>Operation Type</MenuItem>
                                {
                                    OperationsTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton autoFocus type="submit" loading={formik.isSubmitting}>
                            Save changes
                        </LoadingButton>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}

export default AddOperationDialog;
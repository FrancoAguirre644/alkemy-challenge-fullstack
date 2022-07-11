import React from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { Stack } from '@mui/material';

interface SnackbarProps {
    msg: string;
    handleClose: any;
    color: AlertColor;
}

const SnackbarCustom: React.FC<SnackbarProps> = ({ msg, handleClose, color }) => {

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <MuiSnackbar open={msg ? true : false} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={() => handleClose()}>
                <Alert onClose={() => handleClose()} severity={color} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </MuiSnackbar>
        </Stack>
    )
}

export default SnackbarCustom;
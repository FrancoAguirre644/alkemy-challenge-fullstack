import React from 'react';
import SnackbarCustom from './SnackbarCustom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { alert as alertReducer } from "../../redux/slices/alertSlice";

const Notify: React.FC = () => {

    const alert = useSelector((state: RootState) => state.alert);

    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => dispatch(alertReducer({}));

    return (
        <div>
            {alert.errors &&
                <SnackbarCustom
                    msg={alert.errors}
                    handleClose={handleClose}
                    color='error'
                />
            }
            {alert.success &&
                <SnackbarCustom
                    msg={alert.success}
                    handleClose={handleClose}
                    color='success'
                />
            }
        </div>
    )
}

export default Notify;
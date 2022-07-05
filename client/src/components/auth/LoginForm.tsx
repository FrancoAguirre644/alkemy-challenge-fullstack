import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { IUserLogin } from "../../models";
import { AppDispatch } from "../../redux/store";
import { ClientRoutes } from "../../routes/clientRoutes";


const LoginForm = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email.').max(255).required('Email is required.'),
        password: Yup.string().max(255).required('Password is required.')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            dispatch(login(formik.values));
            setTimeout(() => {
                formik.setSubmitting(false);
                navigate(ClientRoutes.HOME);
            }, 1000);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <Box sx={{ my: 3 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    Login
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    Sign in on the internal platform
                </Typography>
            </Box>
            <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
            />
            <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
            />
            <Box sx={{ py: 2 }}>
                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={formik.isSubmitting}
                >
                    Sign In Now
                </LoadingButton>
            </Box>
            <Typography
                color="textSecondary"
                variant="body2"
            >
                Don&apos;t have an account?
                {' '}
                <Link
                    to="/register"
                >
                    Register
                </Link>
            </Typography>
        </form>
    )
}

export default LoginForm;
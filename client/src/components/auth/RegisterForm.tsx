import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';

const RegisterForm: React.FC = () => {

    const registerSchema = Yup.object().shape({
        fullname: Yup.string().max(255).required('Name is required.'),
        email: Yup.string().email('Must be a valid email.').max(255).required('Email is required.'),
        password: Yup.string().max(255).required('Password is required.')
    });

    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: () => { alert('Register!') }
    });

    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <Box sx={{ my: 3 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    Register
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    Use your email to create a new account
                </Typography>
            </Box>

            <TextField
                error={Boolean(formik.touched.fullname && formik.errors.fullname)}
                fullWidth
                helperText={formik.touched.fullname && formik.errors.fullname}
                label="Full Name"
                margin="normal"
                name="fullname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.fullname}
                variant="outlined"
            />

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
                    Sign Up Now
                </LoadingButton>
            </Box>
            <Typography
                color="textSecondary"
                variant="body2"
            >
                Have an account?
                {' '}
                <Link
                    to="/login"
                >
                    Login
                </Link>
            </Typography>
        </form>
    )
}

export default RegisterForm;
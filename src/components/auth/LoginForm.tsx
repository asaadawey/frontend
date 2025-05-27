"use client"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';

// Validation schema for the login form
const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const { login, isLoading, errorMessage } = useAuth();
    const router = useRouter();

    const onSubmit = async (values: FormData) => {
        try {
            await login(values);
            router.push(APP_ROUTES.DASHBOARD);
        } catch {

        }
    };

    return (
        <Container maxWidth="xs">
            <Snackbar
                open={Boolean(errorMessage)}
                color='red'

                anchorOrigin={{ horizontal: "center", vertical: "top" }}

            >
                <Alert variant='filled' severity='error'>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mt: 8 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign In
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ marginTop: 24 }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting || isLoading}
                                loading={isLoading}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </motion.div>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
}
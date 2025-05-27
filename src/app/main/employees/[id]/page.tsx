"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { useEmployees } from '@/hooks/useEmployee';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { APP_ROUTES } from '@/constants/appRoutes';

const EditEmployeePage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const { employees, isLoading, error, updateEmployee } = useEmployees();

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const employee = employees?.find(emp => emp.id === Number(id));

    const handleSubmit = async (values: any) => {

        if (employee) {
            try {
                await updateEmployee({ id: employee?.id, ...values });
                setSnackbar({ open: true, message: 'Employee updated successfully!', severity: 'success' });
                setTimeout(() => {
                    router.push(APP_ROUTES.DASHBOARD);
                }, 1000);
            } catch (err) {
                setSnackbar({ open: true, message: 'Failed to update employee.', severity: 'error' });
            }
        }

    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading employee.</div>;
    if (!employee) return <div>Employee not found.</div>;

    return (
        <div>
            <EmployeeForm
                isEdit
                employees={employees}
                onSubmit={handleSubmit}
                initialValues={employee}
            />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditEmployeePage;
"use client"

import EmployeeForm, { EmployeeFormValues } from '@/components/employees/EmployeeForm';
import { useEmployees } from '@/hooks/useEmployee';
import { Alert, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';

const CreateEmployeePage: React.FC = () => {
    const { employees, createEmployee } = useEmployees();
    const [message, setMessage] = useState<{ text: string; severity: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const onFormSubmit = async (data: EmployeeFormValues) => {
        try {
            await createEmployee(data);
            setMessage({ text: 'Employee created successfully', severity: 'success' });

        } catch (error) {
            setMessage({
                text: error instanceof Error ? error.message : 'An unexpected error occurred',
                severity: 'error',
            });
        }
    };

    return (
        <div>
            {message && (
                <Snackbar
                    open={!!message}
                    onClose={() => setMessage(null)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                >
                    <Alert
                        onClose={() => setMessage(null)}
                        variant="filled"
                        severity={message.severity}
                        sx={{ width: '100%' }}
                    >
                        {message.text}
                    </Alert>
                </Snackbar>
            )}
            <EmployeeForm employees={employees} onSubmit={onFormSubmit} />
        </div>
    );
};

export default CreateEmployeePage;

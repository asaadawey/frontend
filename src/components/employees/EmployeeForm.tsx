"use client"

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {

    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
} from '@mui/material';
import { Employee } from '@/types/employee';
import EmployeeRow from './EmployeeRow';

// Form schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    title: yup.string().required('Title is required'),
    managerId: yup.number().optional(),
});

export type EmployeeFormValues = {
    name: string;
    title: string;
    managerId?: number;
};

type EmployeeFormProps = {
    initialValues?: EmployeeFormValues;
    employees: Employee[];
    onSubmit: (data: EmployeeFormValues) => void;
    isEdit?: boolean;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    initialValues = { name: '', title: '' },
    employees,
    onSubmit,
    isEdit = false,
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EmployeeFormValues>({
        defaultValues: initialValues,
        //@ts-ignore
        resolver: yupResolver(schema),
    });

    return (
        <Box

            sx={{

                mx: 'auto',
                mt: 4,
                p: 4,
                borderRadius: 3,
                boxShadow: 6,
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                {isEdit ? 'Edit Employee' : 'Create Employee'}
            </Typography>
            <Box
                component="form"
                //@ts-ignore
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!errors.managerId}
                >
                    <InputLabel id="reporting-to-label">Reporting To</InputLabel>
                    <Controller
                        control={control}
                        name="managerId"
                        render={({ field }) => (
                            <Select
                                labelId="reporting-to-label"
                                label="Reporting To"
                                {...field}
                                value={field.value ?? ''}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {employees.map((emp) => (

                                    <MenuItem key={emp.id} value={emp.id}>
                                        <EmployeeRow disableEdit
                                            name={emp.name} id={emp.id} title={emp.title} managerId={emp.managerId} />
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    <FormHelperText>
                        {errors.managerId?.message}
                    </FormHelperText>
                </FormControl>

            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
            >
                {isEdit ? 'Update' : 'Create'} Employee
            </Button>
        </Box>
    );
};

export default EmployeeForm;
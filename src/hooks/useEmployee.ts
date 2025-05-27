'use client';

import { useState, useEffect } from 'react';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '@/types/employee';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { API_ROUTES } from '@/constants/apiRoutes';

export function useEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await apiClient.get<Employee[]>(API_ROUTES.GET_EMPLOYEE);
            setEmployees(response);
        } catch (err: any) {
            setError(err.message);
            toast.error('Failed to fetch employees');
        } finally {
            setIsLoading(false);
        }
    };

    const createEmployee = async (employeeData: CreateEmployeeRequest) => {
        try {
            const newEmployee = await apiClient.post<Employee>(API_ROUTES.ADD_EMPLOYEE, employeeData);
            setEmployees(prev => [...prev, newEmployee]);
            toast.success('Employee created successfully');
            return newEmployee;
        } catch (err: any) {
            toast.error(err.message || 'Failed to create employee');
            throw err;
        }
    };

    const updateEmployee = async (employeeData: UpdateEmployeeRequest) => {
        try {
            const updatedEmployee = await apiClient.put<Employee>(
                API_ROUTES.UPDATE_EMPLOYEE + employeeData.id,
                employeeData
            );
            setEmployees(prev =>
                prev.map(emp => emp.id === employeeData.id ? updatedEmployee : emp)
            );
            toast.success('Employee updated successfully');
            return updatedEmployee;
        } catch (err: any) {
            toast.error(err.message || 'Failed to update employee');
            throw err;
        }
    };

    const deleteEmployee = async (id: number) => {
        try {
            await apiClient.delete(API_ROUTES.DELETE_EMPLOYEE + id)
            setEmployees(prev => prev.filter(emp => emp.id !== id));
            toast.success('Employee deleted successfully');
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete employee');
            throw err;
        }
    };

    const getEmployeeById = (id: number): Employee | undefined => {
        return employees.find(emp => emp.id === id);
    };

    const getHierarchy = (): Employee[] => {
        // Build hierarchy tree (employees without managers are root nodes)
        const employeeMap = new Map<number, Employee>();
        const roots: Employee[] = [];

        // Create map of all employees
        employees.forEach(emp => {
            employeeMap.set(emp.id, { ...emp, children: [] });
        });

        // Build the tree
        employees.forEach(emp => {
            const employee = employeeMap.get(emp.id)!;
            if (emp.managerId) {
                const manager = employeeMap.get(emp.managerId);
                if (manager) {
                    manager.children = manager.children || [];
                    manager.children.push(employee);
                }
            } else {
                roots.push(employee);
            }
        });

        return roots;
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return {
        employees,
        isLoading,
        error,
        fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
        getHierarchy,
    };
}
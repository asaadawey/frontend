'use client';

import { useState, useEffect } from 'react';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '@/types/employee';
import { apiClient } from '@/lib/api';
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
        } finally {
            setIsLoading(false);
        }
    };

    const createEmployee = async (employeeData: CreateEmployeeRequest) => {
        try {
            const newEmployee = await apiClient.post<Employee>(API_ROUTES.ADD_EMPLOYEE, employeeData);
            setEmployees(prev => [...prev, newEmployee]);
            return newEmployee;
        } catch (err: any) {
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
            return updatedEmployee;
        } catch (err: any) {
            throw err;
        }
    };

    const deleteEmployee = async (id: number) => {
        try {
            await apiClient.delete(API_ROUTES.DELETE_EMPLOYEE + id)
            setEmployees(prev => prev.filter(emp => emp.id !== id));
        } catch (err: any) {
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
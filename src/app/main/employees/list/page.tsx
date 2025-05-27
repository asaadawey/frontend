"use client";

import React from "react";
import { useEmployees } from "@/hooks/useEmployee";
import { Avatar } from "@mui/material";

const EmployeesListPage = () => {
    const { employees, isLoading, error } = useEmployees();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading employees.</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-center"></th>
                        <th className="px-4 py-2 border-b text-center">Name</th>
                        <th className="px-4 py-2 border-b text-center">Title</th>
                        <th className="px-4 py-2 border-b text-center">Manager ID</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="text-center">
                            <td className="px-4 py-2 border-b flex justify-center items-center">
                                <Avatar>{`${employee.name[0] || ""}${employee.name.split(" ")?.[1]?.[0] || ""}`}</Avatar>
                            </td>
                            <td className="px-4 py-2 border-b">{employee.name}</td>
                            <td className="px-4 py-2 border-b">{employee.title}</td>
                            <td className="px-4 py-2 border-b">{employee.managerName ?? "-"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeesListPage;
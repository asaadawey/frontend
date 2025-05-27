'use client';

import { useEmployees } from '@/hooks/useEmployee';
import { Tree, NodeApi, NodeRendererProps } from 'react-arborist';
import { useRouter } from 'next/navigation';
import { Alert, Box, Button, LinearProgress, Modal, Skeleton, Snackbar, useColorScheme } from '@mui/material';
import EmployeeRow from '@/components/employees/EmployeeRow';
import { useEffect, useState } from 'react';
import EmployeeUpdateModal from '@/components/employees/EmployeeUpdateModal';
import { Employee, EmployeeBasicInfo } from '@/types/employee';

type MoveProps = { dragNodes: NodeApi[], parentNode: NodeApi, parentId: string, index: number, dragIds: string[] }

type Operation = "change-manager" | "delete-reporting-to" | "delete-employee";

export default function HierarchyPage() {
    const [newEmployeeProps, setNewEmployeeProps] = useState<{ newEmployeeDetails: EmployeeBasicInfo; newManagerInfo: EmployeeBasicInfo | undefined }>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [operation, setOperation] = useState<Operation>();
    const { getHierarchy, updateEmployee, isLoading, error, employees, fetchEmployees, deleteEmployee } = useEmployees();
    const hierarchyData = getHierarchy();


    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("")
            }, 5000)
        }
    }, [errorMessage])

    const onEmployeeMove = (props: MoveProps) => {
        console.log({ props })
        if (props.dragNodes[0].data.managerId == props.parentId) {
            setErrorMessage(`The employer (${props.dragNodes[0].data.name}) has the same new manager (${props.parentNode.data.name}). Please reassign to other manager`)
        } else {
            setOperation("change-manager");
            setNewEmployeeProps({
                newEmployeeDetails: props.dragNodes[0].data,
                newManagerInfo: props.parentNode.data
            });
        }


    }

    const onEmployeeParentReportingToRempve = (employeeId: number) => {
        const employee = employees.find(emp => emp.id == employeeId)
        console.log({ employee })
        if (employee) {
            setOperation("delete-reporting-to");
            setNewEmployeeProps({
                newEmployeeDetails: { ...employee, managerId: undefined },
                newManagerInfo: undefined
            })
        }
    }

    const onEmployeeDelete = (employeeId: number) => {
        const employee = employees.find(emp => emp.id == employeeId)

        if (employee) {
            setNewEmployeeProps({
                newEmployeeDetails: employee,
                newManagerInfo: employee?.manager as EmployeeBasicInfo
            })
            setOperation("delete-employee");
        }
    }

    const onModalDiscard = () => {
        setNewEmployeeProps(undefined);
        setOperation(undefined);
    }

    const onModalConfirmationSuccess = async () => {
        if (newEmployeeProps) {
            try {
                if (operation === "change-manager") {
                    await updateEmployee({ ...newEmployeeProps?.newEmployeeDetails, managerId: newEmployeeProps.newManagerInfo?.id })
                } else if (operation === "delete-employee") {
                    await deleteEmployee(newEmployeeProps.newEmployeeDetails.id)
                } else if (operation === "delete-reporting-to") {
                    await updateEmployee({ ...newEmployeeProps.newEmployeeDetails, managerId: undefined })
                }
            } catch { }
            onModalDiscard();
            fetchEmployees();
        }
    }



    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Skeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error loading hierarchy</div>
                <p className="">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Snackbar
                open={Boolean(errorMessage)}
                color='red'

                anchorOrigin={{ horizontal: "center", vertical: "top" }}

            >
                <Alert variant='filled' severity='error'>
                    {errorMessage}
                </Alert>
            </Snackbar>
            {/** Confirmatio */}
            {newEmployeeProps &&
                <EmployeeUpdateModal
                    newEmployeeInfo={newEmployeeProps.newEmployeeDetails}
                    newManagerInfo={newEmployeeProps.newManagerInfo}
                    isDelete={operation === "delete-employee"}
                    onDiscard={onModalDiscard}
                    onSuccess={onModalConfirmationSuccess}
                />}


            <div className="mb-8">
                <h1 className="text-2xl font-bold">Organization Hierarchy</h1>
                <p className="mt-2">
                    Explore your organization's structure and reporting relationships
                </p>
                <p>
                    You can <b>drag and drop</b> employees to change their reporting structure, or click on an employee to edit their details.
                </p>
            </div>

            <div className="rounded-lg shadow-sm  p-6">
                <Tree
                    indent={24}
                    rowHeight={60}
                    width={"100%"}
                    overscanCount={1}
                    padding={25}
                    idAccessor={(node: Employee) => node.id.toString()}
                    // No type is available
                    //@ts-ignore 
                    onMove={onEmployeeMove}
                    data={hierarchyData} >
                    {({ node, style, dragHandle }) => (<div style={{ ...style }} ref={dragHandle} onClick={() => node.toggle()}>
                        <EmployeeRow
                            managerId={(node.data.managerId)}
                            id={node.data.id} name={node.data.name}
                            title={node.data.title}
                            children={node.data.children}
                            onRemoveParentReportingToClick={(employeeId) => {
                                onEmployeeParentReportingToRempve(employeeId)
                            }}
                            onRemoveEmployeeClick={(employeeId) => {
                                onEmployeeDelete(employeeId);
                            }}
                        />
                        <div className="h-px bg-gray-300 w-full my-2" />
                    </div>)}
                </Tree>
            </div>
        </div>
    );
}

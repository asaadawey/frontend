'use client';

import { APP_ROUTES } from '@/constants/appRoutes';
import { useEmployees } from '@/hooks/useEmployee';
import { stringToColor } from '@/lib/utils';
import { Employee } from '@/types/employee';
import { Avatar, Box, Button } from '@mui/material';
import { Delete, DeleteIcon, Pen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EmployeeRowProps {
    name: string;
    title: string;
    children?: any[];
    managerId?: number;
    id?: number;
    disableEdit?: boolean;
    onRemoveParentReportingToClick?: (employeeId: number) => void;
    onRemoveEmployeeClick?: (employeeId: number) => void;

}

export default function EmployeeRow({ name = "", title = "", children, managerId, id, disableEdit, onRemoveEmployeeClick, onRemoveParentReportingToClick }: EmployeeRowProps) {
    const router = useRouter();
    const [firstName = "", lastName = ""] = name?.split?.(" ") || "";

    return (
        <Box className='flex'>

            <Avatar sx={{ bgcolor: stringToColor(name) }}>{`${firstName[0] || ""}${lastName[0] || ""}`}</Avatar>
            <div className="flex flex-col justify-center">
                <Box className='ml-3 content-center font-bold'>
                    {(firstName || "")}
                    {" "}
                    {(lastName || "")}
                </Box>
                <Box className='ml-3 content-center'>
                    {title}
                </Box>
            </div>
            <Box className="flex-1" />
            <Box className='content-center'>
                {`${children?.length ? `${children.length} Report(s)` : ""}`}

            </Box>
            <Box flex={1} />
            {managerId && onRemoveParentReportingToClick && <Button variant='text' onClick={() => onRemoveParentReportingToClick(Number(id))}>
                Remove Reporting-to manager
            </Button>}
            {!disableEdit && <Button color='secondary' variant='text' onClick={() => { router.push(APP_ROUTES.EMPLOYEES_EDIT.replace(":id", String(id))) }}>
                <Pen />
            </Button>}
            {onRemoveEmployeeClick && <Button color='error' variant='text' onClick={() => onRemoveEmployeeClick(Number(id))}>
                <DeleteIcon />
            </Button>}
        </Box >
    );
}
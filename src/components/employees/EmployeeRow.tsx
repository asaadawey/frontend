'use client';

import { APP_ROUTES } from '@/constants/appRoutes';
import { stringToColor } from '@/lib/utils';
import { Employee } from '@/types/employee';
import { Avatar, Box, Button } from '@mui/material';
import { DeleteIcon, Pen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EmployeeRowProps {
    name: string;
    title: string;
    children?: Employee[];
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

            {/* Avatar (Profile image) */}
            <Avatar sx={{ bgcolor: stringToColor(name) }}>{`${firstName[0] || ""}${lastName[0] || ""}`}</Avatar>
            <div className="flex flex-col justify-center">
                <Box className='ml-3 content-center font-bold'>
                    {(firstName || "")}
                    {" "}
                    {(lastName || "")}
                </Box>
                {/* Show title */}
                <Box className='ml-3 content-center'>
                    {title}
                </Box>
            </div>
            <Box className="flex-1" />
            {/* Show reporting number */}
            <Box className='content-center'>
                {`${children?.length ? `${children.length} Report(s)` : ""}`}

            </Box>
            <Box flex={1} />
            {/* Show this button if user have a manager reporting to */}
            {managerId && onRemoveParentReportingToClick && <Button variant='text' onClick={() => onRemoveParentReportingToClick(Number(id))}>
                Remove Reporting-to manager
            </Button>}
            {/* Show edit option if edit is allowed (based on usage by the parent) */}
            {!disableEdit && <Button color='secondary' variant='text' onClick={() => { router.push(APP_ROUTES.EMPLOYEES_EDIT.replace(":id", String(id))) }}>
                <Pen />
            </Button>}
            {/* If remove function defined. Show the onRemove */}
            {onRemoveEmployeeClick && <Button color='error' variant='text' onClick={() => onRemoveEmployeeClick(Number(id))}>
                <DeleteIcon />
            </Button>}
        </Box >
    );
}
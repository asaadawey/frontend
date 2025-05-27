'use client';

import { EmployeeBasicInfo } from '@/types/employee';
import { Avatar, Box, Button, Modal } from '@mui/material';
import EmployeeRow from './EmployeeRow';
import { useEmployees } from '@/hooks/useEmployee';

interface EmployeeUpdateModalProps {
    newManagerInfo: EmployeeBasicInfo | undefined
    newEmployeeInfo: EmployeeBasicInfo
    isDelete?: boolean
    onSuccess: Function;
    onDiscard: Function;
}

export default function EmployeeUpdateModal({ newManagerInfo, newEmployeeInfo, onDiscard, onSuccess, isDelete }: EmployeeUpdateModalProps) {
    const onModalConfirmation = () => {
        onSuccess();
    }

    const onModalDiscard = () => {
        onDiscard();
    }

    return (
        <Modal
            open={Boolean(newEmployeeInfo)}
        >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white shadow-2xl p-4`}>
                <div className='font-bold'>Confirmation</div>
                <div className="h-px bg-gray-300 w-full my-2" />
                <div className='my-3'>
                    Please review the below changes
                </div>
                {!isDelete ? (<><div className='my-3'>
                    New employee info
                </div>

                    <EmployeeRow disableEdit managerId={(newEmployeeInfo.managerId)} name={newEmployeeInfo.name} title={newEmployeeInfo.title} />

                    <div className='my-3'>Reporting to</div>

                    {newManagerInfo ? <EmployeeRow disableEdit managerId={(newManagerInfo.managerId)} name={newManagerInfo.name} title={newManagerInfo.title} /> : <div className='font-bold red'>Removed</div>}
                </>) : (
                    <>
                        <div>Are you sure you want to delete below employee</div>
                        <EmployeeRow disableEdit managerId={(newEmployeeInfo.managerId)} name={newEmployeeInfo.name} title={newEmployeeInfo.title} />
                    </>


                )}


                <div className="h-px bg-gray-300 w-full my-2" />
                <div className='flex'>
                    <div className='flex-1' />
                    <Button variant='outlined' color='success' onClick={onModalConfirmation}>Confirm</Button>
                    <Button variant='outlined' color='error' onClick={onModalDiscard}>Discard</Button>
                </div>

            </div>
        </Modal>
    )
}
export interface EmployeeBasicInfo {
    id: number;
    name: string;
    title: string;
    managerId?: number;
}

export interface Employee extends EmployeeBasicInfo {
    manager?: Employee;
    managerName?: string;
    subordinates?: Employee[];
    children?: Employee[];
    createdAt: string;
    updatedAt: string;
}



export interface CreateEmployeeRequest {
    name: string;
    title: string;
    managerId?: number;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
    id: number;
}
import { Task } from "./Task.model";

export interface ListData {
    registrationDate: Date,
    employeeId: number,
    clockIn: string,
    clockOut: string,
    taskId: number,
    justificative?: string,
}
export interface ILeaves{
    empName: string
    empContactNo: string
    employeeId: number
    leaveDate: string
    leaveId: number
    leaveReason: string
    noOfFullDayLeaves: number
    noOfHalfDayLeaves: number
}

export class leaves{
    leaveId: number;
    employeeId: number;
    leaveDate?: string;
    leaveReason: string;
    noOfFullDayLeaves: number;
    noOfHalfDayLeaves: number;

    constructor(){
        this.leaveId = 0;
        this.employeeId =0;
        this.leaveDate= undefined;
        this.leaveReason="";
        this.noOfFullDayLeaves =0;
        this.noOfHalfDayLeaves=0;
    }
}
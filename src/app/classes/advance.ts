export interface IAdvance{
    empName: string
    empContactNo: string
    employeeId: number
    advanceDate: string
    advanceAmount: number
    advanceId: number
    reason: string
}

export class advance{
    advanceId: number;
    employeeId: number;
    advanceDate?: Date;
    advanceAmount: number;
    reason: string;

    constructor(){
        this.advanceId=0;
        this.employeeId=0;
        this.advanceDate= undefined;
        this.advanceAmount = 0 ;
        this.reason="";
    }
}
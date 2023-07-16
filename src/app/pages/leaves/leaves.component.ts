import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { advance } from 'src/app/classes/advance';
import { ILeaves, leaves } from 'src/app/classes/leaves';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
leavesArray: ILeaves[]=[];
leavesObj:leaves =new leaves();
employeeArray:any[]=[];

constructor(private empSrv:EmployeeService,private  http:HttpClient){
  this.resetObj();
}

resetObj(){
  this.leavesObj={
    "leaveId": 0,
    "employeeId": 0,
    "leaveDate": "",
    "leaveReason": "",
    "noOfFullDayLeaves": 0,
    "noOfHalfDayLeaves": 0,
  }

}
ngOnInit(): void {
  this.loadAllLeaves();
  this.getEmployee();
}
getEmployee(){
this.empSrv.getAllEmployee().subscribe((result:any) => {
this.employeeArray =result.data;
})}

loadAllLeaves(){
  this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves").subscribe((res:any)=>{
    this.leavesArray = res.data
  })
  
  }
  
  onEdit(id:number){
      this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeavesByEmpId?empid="+id).subscribe((res:any)=>{
      this.leavesObj =res.data
      // if(res.result){
        //   this.loadAllLeaves();
        //   // this.leavesObj = new leaves();
        //   this.leavesObj =res.data
        // }
        // alert(res.message)
      })
    }
  
    onDelete(id:number){
      this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteLeaveById?leaveid="+id).subscribe((res:any)=>{
        if(res.result){
          this.loadAllLeaves();
          this.leavesObj = new leaves();
        }
        alert(res.message)
      })
    }
  
    onSave(){
      this.http.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddLeave",this.leavesObj).subscribe((Res:any)=>{
        if(Res.result){
          this.loadAllLeaves();
          this.leavesObj = new leaves();
        }
        alert(Res.message) 
      })
    }
  
    onUpdate(){
  
      this.http.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeave",this.leavesObj).subscribe((Res:any)=>{
      
      if(Res.result){
    
          this.loadAllLeaves();
          // this.leavesObj = new leaves();
        }
        alert(Res.message) 
      })
    }


}

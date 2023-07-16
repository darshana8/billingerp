import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAttendance, attendance } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
attendanceArray:IAttendance [] =[];
attendanceObj:attendance= new attendance();
employeeArray:any[]=[];

constructor(private empSrv:EmployeeService, private http:HttpClient){
  this.resetObj();
}

resetObj(){
  this.attendanceObj={
    "attendanceId": 0,
    "employeeId": 0,
    "attendanceDate": new Date(),
    "inTime": new Date(),
    "outTime": new Date(),
    "isFullDay": false,
  } 
}

ngOnInit():void{
  this.loadAllAttendance();
  this.getEmployee();

}

getEmployee(){
  this.empSrv.getAllEmployee().subscribe((result:any) => {
this.employeeArray =result.data;
  })}

  loadAllAttendance(){
    this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendance").subscribe((res:any)=>{
      this.attendanceArray = res.data
    })
  }


// onEdit(id:number){
// this.http.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAttendance",this.attendanceObj).subscribe((res:any)=>{
//   if(res.result){
//     this.loadAllAttendance();
//     this.attendanceObj = new attendance();
//   }
//   alert(res.message)
// })
// }

onDelete(id:number){
this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById?attendanceid="+id).subscribe((Res:any)=>{
  if(Res.result){
    this.loadAllAttendance();
    this.attendanceObj = new attendance();
  }
  alert(Res.message)
})
}

onSave(){
this.http.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAttendance",this.attendanceObj).subscribe((Res:any)=>{
  if(Res.result){
    this.loadAllAttendance();
    this.attendanceObj = new attendance();
  }
  alert(Res.message)
})
}

onUpdate(){}

}

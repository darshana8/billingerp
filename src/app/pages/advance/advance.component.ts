import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAdvance, advance } from 'src/app/classes/advance';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit{

  advanceArray: IAdvance[]=[];
  advanceObj:advance = new advance();
  employeeArray:any[]=[];

  constructor(private empSrv:EmployeeService,private  http:HttpClient){
    this.resetObj();
  }


resetObj(){
  this.advanceObj ={
    "advanceId": 0,
    "employeeId": 0,
    "advanceDate": new Date(),
    "advanceAmount": 0,
    "reason": " ",
  }
}

ngOnInit(): void {
    this.loadAllAdvance();
    this.getEmployee();
}
getEmployee(){
  this.empSrv.getAllEmployee().subscribe((result:any) => {
this.employeeArray =result.data;
  })}


loadAllAdvance(){
this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance").subscribe((res:any)=>{
  this.advanceArray = res.data
})

}
  // onEdit(id:number){
  //   this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvanceByEmpId?empid="+id).subscribe((res:any)=>{
  //     if(res.result){
  //       this.loadAllAdvance();
  //       this.advanceObj = new advance();
  //     }
  //     alert(res.message)
  //   })
  // }

  onDelete(id:number){
    this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAdvanceById?advanceid="+id).subscribe((res:any)=>{
      if(res.result){
        this.loadAllAdvance();
        this.advanceObj = new advance();
      }
      alert(res.message)
    })
  }

  onSave(){
    this.http.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAdvance",this.advanceObj).subscribe((Res:any)=>{
      if(Res.result){
        this.loadAllAdvance();
        this.advanceObj = new advance();
      }
      alert(Res.message) 
    })
  }

  onUpdate(){
    this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance").subscribe((Res:any)=>{
      if(Res.result){
        this.loadAllAdvance();
        this.advanceObj = new advance();
      }
      alert(Res.message) 
    })
  }
}

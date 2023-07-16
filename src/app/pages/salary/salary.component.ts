import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit{
  employeeArray:any[]=[];
  salaryObj:any ={
    "salaryId": 0,
    "employeeId": 0,
    "salaryDate": "",
    "totalAdvance": 0,
    "presentDays": 0,
    "salaryAmount": 0
  }
  
  salaryArray:any []=[]
  totalAdvAmount:number=0;
  totalLeaves:number=0;

  constructor(private empSrv:EmployeeService,private http:HttpClient){
    this.resetObj();
  }
  
  resetObj(){
    this.salaryObj={
      "salaryId": 0,
      "employeeId": 0,
      "salaryDate": "",
      "totalAdvance": 0,
      "presentDays": 0,
      "salaryAmount": 0
    }
  }



ngOnInit(): void {
  // debugger;
    this.loadAllEmployee();
    this.getAllSalary();
}
loadAllEmployee(){
    this.empSrv.getAllEmployee().subscribe((res:any)=>{
    this.employeeArray = res.data;
  })
}

getAllSalary(){
  this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalary").subscribe((res:any)=>{
    this.salaryArray =res.data;
  })
}

// onDelete(id:number){
//   this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteSalaryById?salaryid="+id).subscribe((res:any)=>{
//     if(res.result){
//       this.getAllSalary();
      
//     }
//     alert(res.message)
//   })
// }

onSave(){
this.http.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddSalary",this.salaryObj).subscribe((res:any)=>{
  
  if(res.result){
    this.getAllSalary();
    alert(res.message);
    
  }else{
    alert(res.message)
  }
})
}

getEmpData(){
  this.GetAllAdvance();
  this.GetAllLeaves();
}

GetAllAdvance  (){
  this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance").subscribe((res:any)=>{
  const data = res.data.filter((m:any)=> m.employeeId == this.salaryObj.employeeId);
  data.forEach((element:any) => {
    this.totalAdvAmount =this.totalAdvAmount + element.advanceAmount;
  });
  this.salaryObj.totalAdvance =this.totalAdvAmount;
  })
}

GetAllLeaves  (){
  this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves").subscribe((res:any)=>{
  this.totalLeaves = res.data.filter((m:any)=> m.employeeId == this.salaryObj.employeeId).length;
  this.salaryObj.presentDays = 30-this.totalLeaves;
  })
}

calculateSalary(){
  const empData = this.employeeArray.find(m=>m.empId == this.salaryObj.employeeId)

  const perDaySalary = empData.salary / 30;

  this.salaryObj.salaryAmount =((this.salaryObj.presentDays * perDaySalary) - this.salaryObj.totalAdvance).toFixed(0);
}
}

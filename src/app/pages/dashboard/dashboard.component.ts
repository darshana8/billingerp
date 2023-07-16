import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  employeeArray:any[]=[];
  dashboard:any={
    "totalEmployee": 0,
    "totalAdvanceRecordCount": 0,
    "totalLeavesCount": 0,
    "totalSalaryCount": 0,
    "todaysAdvanceTotalAmount": 0,
    "todaysLeaves": 0,
  }

  dashboardArray:any []=[]

  constructor(private empSrv:EmployeeService,private http:HttpClient){
    
  }

  ngOnInit(): void {
    // debugger;
      this.loadAllEmployee();
      this.getAdminDashboard();
  }
  loadAllEmployee(){
      this.empSrv.getAllEmployee().subscribe((res:any)=>{
      this.employeeArray = res.data;
    })
  }

  getAdminDashboard(){
    this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/getAdminDashboard").subscribe((res:any)=>{
      this.dashboardArray =res.data;
      console.log(this.dashboardArray)
    })
  }
}

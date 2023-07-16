import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AdvanceComponent } from './pages/advance/advance.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    EmployeeComponent,
    AdvanceComponent,
    LeavesComponent,
    SalaryComponent,
    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

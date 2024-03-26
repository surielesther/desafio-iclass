import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUserInfo } from '../../interfaces/userInterfaces';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ClusterService } from '../../services/clusterService';
import { ServiceOrderService } from '../../services/serviceOrderService';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { catchError, throwError } from 'rxjs';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LoginComponent, HttpClientModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatNativeDateModule, CommonModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userInfo: IUserInfo = {
    attributes: {
      locale: '',
      id: ''
    },
    email: '',
    fullName: '',
    username: ''
  };
  dateRange = { start: '', end: '' };
  clusters = [
        {
            nome: '',
            uf: '',
            regional: '',
            credenciadas: '',
        }];
  showTag: boolean = false;
  noneServiceFounded: boolean = false;
  showInput: boolean = false;
  selectedCluster: string = '';
  selectedFilter: string = '';
  datePipe = new DatePipe('pt-BR');
  serviceOrders: any = [];
  code: string = '';
  filters = []
  showDetails = false;
  // customerName: string = 'customerName';
  // ssn: string = 'ssn';
  // thirdPartyCode: string = 'thirdPartyCode';
  // statuses: string = 'statuses';
  // updatedDate_begin: string = 'updatedDate_begin';
  // closedBy: string = 'closedBy';
  // filterValue: any = '';
  // queryParams: object[] = []

  constructor ( private http: HttpClient, private router: Router, private clusterService: ClusterService,
    private serviceOrderService: ServiceOrderService){}

  ngOnInit(): void {

    const token = localStorage.getItem('userToken')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<IUserInfo>('/api/auth/me', { headers: headers }).pipe(
      catchError(this.handleError)
    ).subscribe(response => {
        this.userInfo = response
      });
      
    }

  selectCluster(){
    this.clusterService.getClusters().subscribe(response => {
      this.clusters = response.objects
      this.showTag = true;
      this.showInput = false;
    })
  }

  searchByCluster(){
    let startDate = this.dateRange.start || new Date();
    let endDate = this.dateRange.end || new Date();
    let formattedStartDate = this.datePipe.transform(startDate, 'dd-MM-yyyy hh:mm:ss') || '';
    let formattedEndDate = this.datePipe.transform(endDate, 'dd-MM-yyyy hh:mm:ss') || '';
      // let queryParams = {
      //   selectedFilter: this.filterValue
      // } || '';

    this.serviceOrderService.getServiceOrderByCluster(this.selectedCluster, formattedStartDate, formattedEndDate).subscribe(
      response => {
        if (response == null){
          this.noneServiceFounded = true
          this.serviceOrders = []
        } else {
          this.noneServiceFounded = false
          this.serviceOrders = response.objects?.map(key => key) || []
        }
      }
    )
    
    
  }

  codeSearch(){

    this.serviceOrderService.getServiceOrderByCode(this.code).subscribe(response => {
      if (response == null){
        this.noneServiceFounded = true
        this.serviceOrders = []
      } else {
        this.noneServiceFounded = false
        this.serviceOrders = response.objects?.map(key => key) || []
      }
    })
  }

  showCodeInput() {
    this.showInput = true
    this.showTag = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    
    return throwError(errorMessage);
  }
 
}

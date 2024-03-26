import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { IServiceResponse } from '../interfaces/serviceOrdersInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {

  constructor(private http: HttpClient, private router: Router) {}

  getServiceOrderByCluster(clusterName: string, createdDate_begin: string, createdDate_end: string, queryParams?: any ): Observable <IServiceResponse> {
    const token = localStorage.getItem('userToken')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams().set('clusterName', clusterName);
    params = params.set('createdDate_begin', createdDate_begin)
    params = params.set('createdDate_end', createdDate_end)

    if (queryParams) {
      for (let key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          params = params.set(key, queryParams[key]);
        }
      }
    }
    return this.http.get<any>(`/api/serviceorders`, { headers, params }).pipe(
      catchError(this.handleError)
    )
  }

  getServiceOrderByCode(code: string ): Observable <IServiceResponse> {
    const token = localStorage.getItem('userToken')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams().set('serviceOrderCode', code)

    return this.http.get<any>(`/api/serviceorders`, { headers, params }).pipe(
      catchError(this.handleError)
    )
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
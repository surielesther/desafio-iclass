import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}
  private token!: string;

  login(username: string, password: string) {
    return this.http.post<{access_token: string}>('/api/login', {username, password})
    .pipe(
      catchError(this.handleError)
    )
      .subscribe(response => {
        this.token = response.access_token;
        localStorage.setItem('userToken', this.token);
        this.router.navigate(['home']);
      })
  }

  getToken() {
    return this.token;
  }

  logout(){
    localStorage.removeItem('userToken')
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
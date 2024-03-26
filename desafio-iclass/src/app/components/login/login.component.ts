import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { HttpClientModule } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule,
    ReactiveFormsModule, HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  token: string = '';
  username: string = '';
  password: string = '';
  constructor (private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get f() {
    return this.loginForm.controls;
  }

  onLogin(username: string, password: string) {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    this.authService.login(username, password);
  }

  getToken() {
    return this.token;
  }

  public submitForm(): void {
    if (this.loginForm.valid) {

      this.username = this.loginForm.value.username!
      this.password = this.loginForm.value.password!
      
      this.onLogin(this.username, this.password)
      this.cdr.detectChanges();
      this.router.navigate(['home']);
    }
    else{
    }
  }

}

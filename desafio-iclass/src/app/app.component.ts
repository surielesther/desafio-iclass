import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, LoginComponent, HttpClientModule ]
})
export class AppComponent implements OnInit{
  usuarioLogado = false;

  ngOnInit() {
    this.usuarioLogado = !!localStorage.getItem('userToken');
  }

  title = 'desafio-iclass';

  get showLogin(){
    const token = localStorage.getItem('token');
    this.usuarioLogado 
    return token ? true : false;
  }
}

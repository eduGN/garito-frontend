import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import {Login} from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mForm: FormGroup
  isSent = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService) {

      this.mForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]+[a-zA-Z]{2,4}$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[a-zA-z][a-z0-9]+[aa-z0-9]$/)]]
      })

     }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) this.router.navigate(["/artist"])
  }

  get f() {
    return this.mForm.controls
  }

  onSubmit() {

    this.isSent = true

    console.log("Enviar form");

    if (this.mForm.invalid) {
      return
    }
    /*Hacer llamada al service
    Hacer dos servicios: user, people
    llamar al servicio de login y en la respuesta guardar en el localStorage el token y redirigir al DASHBOARD
    */

    const login: Login = new Login()
    login.username = this.f.username?.value
    login.password = this.f.password?.value
    this.userService.login(login).subscribe((data: any) => {
      localStorage.setItem("token",data.access_token)
      localStorage.setItem("username",data.data.username)
      this.router.navigate([`/${data.data.username}`])
      console.log(data)
    },
      error => {
        console.log("Error:", error);
      }
    );

  }





}

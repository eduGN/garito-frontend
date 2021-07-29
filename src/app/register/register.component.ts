import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Register} from '../models/register.model';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  mForm: FormGroup
  isSent = false
  errorPass = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService) {

      this.mForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]+[a-zA-Z0-9]$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[a-zA-z][a-z0-9]+[a-z0-9]$/)]],
        confirm_password: ['', [Validators.required, Validators.pattern(/^[a-zA-z][a-z0-9]+[a-z0-9]$/)]],
        artist_name: ['', [Validators.required, Validators.pattern(/^[a-zA-z][a-zA-z0-9\s]+[a-z0-9]$/)]],
        email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/)]],
        location: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z]+[a-zA-Z]$/)]]
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

    if (this.mForm.invalid || this.f.password?.value != this.f.confirm_password?.value) {
      this.errorPass = true
      return
    }
    /*Hacer llamada al service
    Hacer dos servicios: user, people
    llamar al servicio de login y en la respuesta guardar en el localStorage el token y redirigir al DASHBOARD
    */

    const register: Register = new Register()

    register.username = this.f.username?.value
    register.password = this.f.password?.value
    register.artist_name = this.f.artist_name?.value
    register.email = this.f.email?.value
    register.location = this.f.location?.value

    this.userService.register(register).subscribe((data: any) => {
      localStorage.setItem("token",data.access_token)
      console.log(data)
      this.router.navigate(["/artist"])
      console.log(data)
    },
      error => {
        console.log("Error:", error);
      }
    );
 }
}

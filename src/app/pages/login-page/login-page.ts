import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data/services/auth/auth-service';
import { from, map, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(AuthService)
  router = inject(Router)

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  onSubmit() {
    console.log(this.form.value)
    const { username, password } = this.form.value
    if (username && password) {
      this.authService.login({ username, password }).subscribe(res => {
        this.router.navigate(['/'])
      })
    }
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data/services/auth/auth-service';
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

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  onSubmit() {
    const { username, password } = this.form.value
    if (username && password) {
      this.authService.login({ username, password }).subscribe(res => {
        this.router.navigate(['/'])
      })
    }
  }

  onTogglePasswordVisibility() {
    this.isPasswordVisible.set(!this.isPasswordVisible())
  }
}

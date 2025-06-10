import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator]]
  });

  loginSuccess = signal<boolean>(false);
  loginError = signal<boolean>(false);
  loginNoUser = signal<boolean>(false);
  registrationSuccess = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.registrationSuccess.set(true);
        setTimeout(() => this.registrationSuccess.set(false), 2000);
      }
    });
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`]/.test(value);
    const isValidLength = value.length >= 6;
    const valid = hasUpperCase && hasSpecialChar && isValidLength;
    return valid ? null : { passwordStrength: true };
  }

  onSubmit(): void {
    console.log('Login submit', this.loginForm.value);
    if (this.loginForm.valid) {
      if (!this.auth.hasUser()) {
        this.loginNoUser.set(true);
        this.loginSuccess.set(false);
        this.loginError.set(false);
        setTimeout(() => {
          this.router.navigate(['/register']);
          this.loginNoUser.set(false);
        }, 1500);
        return;
      }
      const { email, password } = this.loginForm.value as { email: string; password: string };
      const result = this.auth.login(email, password);
      console.log('Auth login result:', result);
      if (result) {
        this.loginSuccess.set(true);
        this.loginError.set(false);
        this.router.navigate(['/products']);
      } else {
        this.loginSuccess.set(false);
        this.loginError.set(true);
        setTimeout(() => this.loginError.set(false), 2000);
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
} 
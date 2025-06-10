import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'success', component: LoginSuccessComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'dashboard', component: LoginComponent }, // Geçici olarak dashboard'a da login component'i yönlendiriyoruz
  { path: '**', redirectTo: '/login' }
];

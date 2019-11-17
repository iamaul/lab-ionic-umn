import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { 
    path: 'auth', 
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthPageModule' 
      },
      {
        path: 'signup',
        loadChildren: './auth/signup/signup.module#SignupPageModule'
      }
    ]
  },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

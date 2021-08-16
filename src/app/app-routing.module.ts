import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

import { FacebookGuard } from './guards/facebook.guard';

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { 
    path:'', 
    loadChildren: () => import('./components/home/home.module').then(m=> m.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

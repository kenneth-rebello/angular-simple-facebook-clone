import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookGuard } from 'src/app/guards/facebook.guard';


import { HomeComponent } from './home.component';

const routes: Routes = [
  { 
    path:'', 
    component: HomeComponent,
    canActivate: [FacebookGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

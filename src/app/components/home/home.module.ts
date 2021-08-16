import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class HomeModule { }

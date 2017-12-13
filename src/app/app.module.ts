import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations:  [ 
    HomeComponent
  ],
  imports:      [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ 
    DataService
  ],
  bootstrap:     [ HomeComponent ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

// import { NgFlashMessagesModule } from 'ng-flash-messages';
      


import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    // Vex
    VexModule,
    
    AmazingTimePickerModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule
  ],
  providers: [DatePipe,AppComponent,MatDatepickerModule,NgxMaterialTimepickerModule],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

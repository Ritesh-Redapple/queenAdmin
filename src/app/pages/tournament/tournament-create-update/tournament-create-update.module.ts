import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TournamentCreateUpdateComponent } from './tournament-create-update.component';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { MatDividerModule } from '@angular/material/divider';
import {MatTabsModule,MatDatepickerModule, MatNativeDateModule } from "@angular/material";

import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    IconModule,
    MatDividerModule,

    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule
    
  ],
  declarations: [TournamentCreateUpdateComponent],
  entryComponents: [TournamentCreateUpdateComponent],
  exports: [TournamentCreateUpdateComponent]
})
export class TournamentCreateUpdateModule {
}

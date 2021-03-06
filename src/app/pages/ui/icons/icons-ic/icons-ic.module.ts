import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsIcRoutingModule } from './icons-ic-routing.module';
import { IconsIcComponent } from './icons-ic.component';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [IconsIcComponent],
  imports: [
    CommonModule,
    IconsIcRoutingModule,
    IconModule,
    FlexLayoutModule
  ]
})
export class IconsIcModule {
}

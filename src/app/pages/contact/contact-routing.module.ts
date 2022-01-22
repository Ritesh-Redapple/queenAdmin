import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';
import { ContactlistComponent } from './contact.component';
import { ContactCreateUpdateComponent } from './contact-create-update/contact-create-update.component';


const routes: VexRoutes = [
  {
    path: '',
    component: ContactlistComponent,
    
    data: {
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactlistRoutingModule {
}

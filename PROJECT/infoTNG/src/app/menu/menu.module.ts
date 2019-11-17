import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { MenuRoutingModule } from './menu-routing.module';

// const routes: Routes = [
//   {
//     path: '',
//     component: MenuPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    // RouterModule.forChild(routes),
    MenuRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}

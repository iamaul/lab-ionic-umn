import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedsPage } from './feeds.page';
import { PostFeedsModule } from '../../components/post-feeds/post-feeds.module';

const routes: Routes = [
  {
    path: '',
    component: FeedsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PostFeedsModule
  ],
  declarations: [FeedsPage]
})
export class FeedsPageModule {}

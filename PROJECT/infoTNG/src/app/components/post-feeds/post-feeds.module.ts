import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFeedsComponent } from './post-feeds.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TruncateModule } from '@yellowspot/ng-truncate';

@NgModule({
  declarations: [
    PostFeedsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    /**
     * A solution to truncate text
     * http://codebuckets.com/2018/01/23/angular-pipe-to-truncate-text-to-the-nearest-whole-word/
     * OR https://stackoverflow.com/a/50651908/4982169
     */
    TruncateModule,
  ],
  exports: [
    PostFeedsComponent,
  ]
})
export class PostFeedsModule { }
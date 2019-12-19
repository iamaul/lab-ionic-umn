import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, Tag } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {

  posts$: Observable<Post[]>;
  tags: Tag;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.posts$ = this.postService.posts;
  }

  handleOnPostAction(event) {
    const functionName = event.functionName;
    if (this[functionName]) {
      const param = event.functionParam;
      this[functionName](param.item);
    }
  }

  likePost(post: Post) {

  }

  commentPost(post: Post) {
    
  }

  filterByTag(tag: Tag) {
    console.log('(feeds.page.ts) filterByTag: ', tag);
    this.tags = tag;
    this.postService.filterByTag(tag);
  }

  resetFilters() {
    this.tags = null;
    this.postService.resetFilters();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Post, Tag } from '../../models/post.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-feeds',
  templateUrl: './post-feeds.component.html',
  styleUrls: ['./post-feeds.component.scss'],
})
export class PostFeedsComponent {

  @Input() post: Post;
  @Output() action: EventEmitter<object> = new EventEmitter<object>();
  @Output() filter: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  // delete(event, post: Post) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.action.emit({
  //     functionName: 'deleteItem',
  //     functionParam: { post }
  //   });
  // }

  // update(event, post: Post) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.action.emit({
  //     functionName: 'updateItem',
  //     functionParam: { post }
  //   });
  // }

  like(event, post: Post) {
    event.preventDefault();
    event.stopPropagation();
    this.action.emit({
      functionName: 'likePost',
      functionParam: { post }
    });
  }

  comment(event, post: Post) {
    event.preventDefault();
    event.stopPropagation();
    this.action.emit({
      functionName: 'commentPost',
      functionParam: { post }
    });
  }

  filterByTag(event, tag: Tag) {
    event.preventDefault();
    event.stopPropagation();
    this.filter.emit(tag);
  }
}

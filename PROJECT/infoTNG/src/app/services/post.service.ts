import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  Query
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { Post, Tag, PostStruct } from '../models/post.model';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private userId: string;

  private postsCollection: AngularFirestoreCollection<Post>;

  private collectionPath = 'posts';
  private tagFilter$: BehaviorSubject<Tag>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.tagFilter$ = new BehaviorSubject(null);
    this.postsCollection = afs.collection<Post>(this.collectionPath, ref => ref.orderBy(PostStruct.CREATED_AT, 'desc'));
  }

  get posts() {
    return this.tagFilter$.pipe(
      switchMap(tag => {
        return this.afs.collection<Post>(this.collectionPath, ref => {
          let query: Query = ref;
          if (tag) { query = query.where(PostStruct.TAGS, 'array-contains', tag); }
          query = query.orderBy(PostStruct.CREATED_AT, 'desc');
          return query;
        }).valueChanges({ idField: 'id' });
      }
    ));
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public push(post: any): Promise<DocumentReference> {
    const timestamp = this.timestamp;

    this.authService.userId.pipe(take(1)).subscribe(userId => {
      if (!userId) {
        console.error('(post.service) push(): ', userId);
        return;
      }
      this.userId = userId;
    });

    return this.postsCollection.add({
      ...post,
      userId: this.userId,
      createdAt: timestamp,
      updatedAt: timestamp
    });
  }

  public getPostById(id: string): Observable<any> {
    return this.postsCollection.doc(id).valueChanges();
  }

  public filterByTag(tag: Tag) {
    this.tagFilter$.next(tag);
  }

  public resetFilters() {
    this.tagFilter$.next(null);
  }

  public remove(id: string): Promise<void> {
    return this.postsCollection.doc(id).delete();
  }

  public set(id: string, data: any): Promise<void> {
    data.updatedAt = this.timestamp;
    return this.postsCollection.doc(id).set(data);
  }

  public update(id: string, data: any): Promise<void> {
    data.updatedAt = this.timestamp;
    return this.postsCollection.doc(id).update(data);
  }
}
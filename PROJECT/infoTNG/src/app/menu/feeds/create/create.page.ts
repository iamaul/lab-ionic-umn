import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { first } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  post: Post;
  form: FormGroup;

  private postId: string;
  private createAction: boolean;
  private alertMsg: string;

  constructor(
    formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public postService: PostService
  ) {
    this.form = formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      tags: [''],
      caption: ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   title: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required, Validators.maxLength(100)]
    //   }),
    //   tags: new FormControl(null, {
    //     updateOn: 'blur'
    //   }),
    //   caption: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   })
    // });

    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.createAction = !this.postId;

    if (this.createAction) {
      this.post = new Post();
    } else {
      this.postService.getPostById(this.postId).pipe(first()).toPromise().then(
        data => {
          this.post = data;
          this.form.patchValue(this.post);
        }
      )
    }
  }

  onUserCreatePost() {
    console.log(this.form);
    if (this.createAction) {
      this.save();
    } else {
      this.update();
    }
  }

  private save() {
    this.loadingCtrl.create({ keyboardClose: true, message: 'Posting ...' })
      .then(loadingEl => {
        loadingEl.present();
        this.postService.push(this.form.value)
          .then(docRef => {
            loadingEl.dismiss();
            this.router.navigate([`/menu/tabs/feeds/detail/${docRef.id}`]);
          })
          .catch(reason => {
            loadingEl.dismiss();
            console.log(reason);
            this.showAlert(reason);
          });
      });
  }

  private update() {
    this.loadingCtrl.create({ keyboardClose: true, message: 'Updating ...' })
      .then(loadingEl => {
        loadingEl.present();
        this.postService.update(this.postId, this.form.value)
          .then(() => {
            loadingEl.dismiss();
            this.router.navigate([`/menu/tabs/feeds/detail/${this.postId}`]);
          })
          .catch(reason => {
            loadingEl.dismiss();
            console.log(reason);
            this.showAlert(reason);
          });
      });
  }

  private showAlert(message: string) {
    this.alertMsg = this.createAction ? 'An error has occurred while creating the post' : 'An error has occurred while updating the post';
    this.alertCtrl
      .create({
        header: this.alertMsg,
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}

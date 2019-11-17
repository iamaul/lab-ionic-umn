import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  loadRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesSvc: RecipesService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('recipeId')) { return; }
        this.loadRecipe = this.recipesSvc.getRecipe(paramMap.get('recipeId'));
      }
    )
  }

  async removeRecipe() {
    const alert = await this.alertController.create({
      header: 'Delete?',
      message: `Are you sure you want to delete this <b>${this.loadRecipe.title}</b>?`,
      buttons: [
        {
          text: 'Sure',
          handler: () => {
            this.destroyRecipe(this.loadRecipe.id);
          }
        },
        {
          text: 'No!',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  async deleteToast() {
    const toast = await this.toastController.create({
      message: `${this.loadRecipe.title} has been deleted.`,
      duration: 2000
    });
    toast.present();
  }

  destroyRecipe(recipeId: string) {
    this.recipesSvc.deleteRecipe(recipeId);
    this.deleteToast();
    this.router.navigate(['/recipes']);
  }
}

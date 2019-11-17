import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getAllRecipes();
  }

  detailRecipe(recipeId: string) {
    console.log(this.recipesService.getRecipe(recipeId));
  }

  removeRecipe(recipeId: string) {
    this.recipesService.deleteRecipe(recipeId);
    this.recipes = this.recipesService.getAllRecipes();
    console.log(this.recipes);
  }

}

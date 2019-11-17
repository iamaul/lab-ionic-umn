import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Gado-gado',
      imageUrl: 'https://i1.wp.com/resepkoki.id/wp-content/uploads/2016/12/Resep-Gado-Gado.jpg?fit=2461%2C2359&ssl=1',
      ingredients: ['Lontong', 'Sawi', 'Bumbu Kecap', 'Tauge']
    },
    {
      id: 'r2',
      title: 'Ketupat',
      imageUrl: 'https://cdn.idntimes.com/content-images/post/20190502/c22eb92d2d3738702fb0434e339cfbca-1-b9b0ec35aa17b97860c72fe047cd216d_600x400.jpg',
      ingredients: ['Nasi', 'Air Rebus']
    },
    {
      id: 'r3',
      title: 'Pizza Margherita',
      imageUrl: 'https://assets.marthastewart.com/styles/wmax-520-highdpi/d31/pizza-margherita-0606-mla102155/pizza-margherita-0606-mla102155_sq.jpg?itok=1ahbOnzY',
      ingredients: ['Terigu', 'Keju', 'Saos', 'Roti']
    }
  ];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id === recipeId;
      })
    }
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    })
  }
}

import {EventEmitter, Injectable} from '@angular/core'
import {Recipe} from '../recipe.model'
import {Ingredient} from '../../shared/ingredient.model'
import {ShoppingListService} from '../../shopping-list/services/shopping-list.service'

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()

  constructor(private slService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'a test recipe',
      'This is a test',
      'https://img.chefkoch-cdn.de/rezepte/1109231216992590/bilder/1426867/crop-600x400/wiener-schnitzel.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'a test another recipe',
      'This is a another test',
      'https://www.ebbing-tm.de/fileadmin/_processed_/2/4/csm_burger-air-fryer9_78052d9005.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Bun', 1)]
    ),
  ]

  get allRecipes() {
    return this.recipes.slice()
  }

  getRecipe(id: number): Recipe {
    return Object.assign({}, this.recipes[id]);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }
}

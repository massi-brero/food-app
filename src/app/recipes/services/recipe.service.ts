import {Injectable} from '@angular/core'
import {Recipe} from '../recipe.model'
import {Ingredient} from '../../shared/ingredient.model'
import {ShoppingListService} from '../../shopping-list/services/shopping-list.service'
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesChangedSubj = new Subject<Recipe[]>()
  recipesChanged$ = this.recipesChangedSubj.asObservable()

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

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.emitRecipes()
  }

  get allRecipes() {
    return this.recipes.slice()
  }

  getRecipe(id: number): Recipe {
    return Object.assign({}, this.recipes[id]);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.emitRecipes()
  }

  updateRecipe(idx: number, recipe: Recipe) {
    this.recipes[idx] = recipe
    this.emitRecipes()
  }

  private emitRecipes() {
    this.recipesChangedSubj.next(this.recipes.slice())
  }

  deleteRecipe(idx: number) {
    this.recipes.splice(idx, 1)
    this.emitRecipes()
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }
}

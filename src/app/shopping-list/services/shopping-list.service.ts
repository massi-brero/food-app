import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../../shared/ingredient.model'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  $ingredientsChanged = this.ingredientsChanged.asObservable()
  startedEditing = new Subject<number>()
  $startedEditing = this.startedEditing.asObservable()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]

  constructor() {}

  get allIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.emitIngredientsChanged()
  }

  getIngredient(idx: number) {
    return this.ingredients[idx]
  }

  updateIngredient(idx: number, newIngredient: Ingredient) {
    this.ingredients[idx] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.emitIngredientsChanged()
  }

  private emitIngredientsChanged() {
    this.ingredientsChanged.next(this.ingredients.slice())
  }


}

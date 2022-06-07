import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../services/shopping-list.service'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import * as ShoppingListActions from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm
  subscription = new Subscription()
  editedItemIndex: number
  editMode = false
  editedItem: Ingredient

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.slService.$startedEditing.subscribe((idx) => {
      this.editedItemIndex = idx
      this.editMode = true
      this.editedItem = this.slService.getIngredient(idx)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.editedItemIndex,
          ingredient: newIngredient,
        })
      )
    } else {
      console.log('huhu')

      // this.slService.addIngredient(newIngredient)
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false
    form.reset()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex)
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.editedItemIndex)
    )
    this.onClear()
  }
}

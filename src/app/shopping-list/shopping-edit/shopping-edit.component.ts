import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm
  subscription = new Subscription()
  editedItemIndex: number
  editMode = false
  editedItem: Ingredient

  constructor(
    private slService: ShoppingListService
  ) {
  }

  ngOnInit(): void {
    this.slService.$startedEditing.subscribe((idx) => {
      this.editedItemIndex = idx
      this.editMode = true
      this.editedItem = this.slService.getIngredient(idx)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(
      value.name,
      value.amount
    )
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient)
    }
    this.editMode = false
    form.reset()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
}

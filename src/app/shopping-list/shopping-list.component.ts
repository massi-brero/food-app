import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './services/shopping-list.service'
import * as fromShoppingsList from './store/shopping-list.reducer'
import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>
  // private igChangedSub: Subscription

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingsList.AppState>
  ) {}

  ngOnDestroy(): void {
    // this.igChangedSub.unsubscribe()
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
  }

  onEditItem(idx: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(idx))
  }
}

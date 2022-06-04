import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShoppingsListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
}

export function shoppingListReducer(
  state = initialState,
  action: ShoppingsListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingsListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    default:
      return state
  }
}

import { Ingredient } from 'src/app/shared/ingredient.model'

import * as ShoppingsListActions from './shopping-list.actions'

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
}

export function shoppingListReducer(
  state = initialState,
  action: ShoppingsListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingsListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    case ShoppingsListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      }
    case ShoppingsListActions.UPDATE_INGREDIENTS:
      return updateIngredients(state, action)
    case ShoppingsListActions.DELETE_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_, idx) => idx !== action.payload
        ),
      }
    default:
      return state
  }
}

const updateIngredients = (
  state,
  action: ShoppingsListActions.UpdateIngredient
) => {
  const ingredient = state.ingredients[action.payload.index]
  const updatedIngredient = {
    ...ingredient,
    ...action.payload.ingredient,
  }
  const updatedIngredients = [...state.ingredients]
  updatedIngredients[action.payload.index] = updatedIngredient

  return {
    ...state,
    ingredients: updatedIngredients,
  }
}

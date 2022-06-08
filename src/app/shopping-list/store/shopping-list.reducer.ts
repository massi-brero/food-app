import { Ingredient } from 'src/app/shared/ingredient.model'

import * as ShoppingsListActions from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[]
  editedIngredient: Ingredient
  editedIngredientIndex: number
}

export interface AppState {
  shoppingList: State
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
}

export function shoppingListReducer(
  state: State = initialState,
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
    case ShoppingsListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.editedIngredient[action.payload] },
      }
    case ShoppingsListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
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

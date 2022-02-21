import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()

  recipes: Recipe[] = [
    new Recipe(
      'a test recipe',
      'This is a test',
      'https://img.chefkoch-cdn.de/rezepte/1402531245175383/bilder/1191295/crop-600x400/moehren-zucchini-bratlinge.jpg'),
    new Recipe(
      'a test another recipe',
      'This is a another test',
      'https://img.chefkoch-cdn.de/rezepte/1402531245175383/bilder/1191295/crop-600x400/moehren-zucchini-bratlinge.jpg')
  ]

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe)
  }
}

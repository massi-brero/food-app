import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms'
import { RecipeService } from '../services/recipe.service'
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit {
  id: number
  editMode = false
  recipeForm: FormGroup
  recipe: Recipe

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']
      this.editMode = params['id'] !== null && params['id'] !== undefined
      this.initForm()
    })
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id)
      recipeName = this.recipe.name
      recipeImagePath = this.recipe.imagePath
      recipeDescription = this.recipe.description
    }

    this.recipeForm = this.fb.group({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
    })
  }

  // get controls() {
  //   return (this.recipeForm.get('ingredients').controls as FormArray)
  // }

  onSubmit() {
    console.log(this.recipeForm)
  }
}

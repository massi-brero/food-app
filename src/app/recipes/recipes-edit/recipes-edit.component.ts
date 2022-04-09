import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms'
import {RecipeService} from '../services/recipe.service'
import {Recipe} from '../recipe.model'

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
    private fb: FormBuilder,
    private router: Router
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
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id)
      recipeName = this.recipe.name
      recipeImagePath = this.recipe.imagePath
      recipeDescription = this.recipe.description

      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe['ingredients']) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          )
        }
      }
    }

    this.recipeForm = this.fb.group({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    })
  }

  get ingredients(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(idx: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(idx)
  }
}

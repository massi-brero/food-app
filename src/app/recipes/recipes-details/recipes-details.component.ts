import {Component, OnInit} from '@angular/core'
import {RecipeService} from "../services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route
      .params.subscribe((params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onRecipeEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}

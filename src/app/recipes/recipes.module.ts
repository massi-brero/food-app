import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RecipeService } from './services/recipe.service'
import { RecipesComponent } from './recipes.component'
import { RecipesListComponent } from './recipes-list/recipes-list.component'
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component'
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component'
import { DropdownDirective } from '../shared/directives/dropdown.directive'
import {AppModule} from "../app.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailsComponent,
    RecipesItemComponent
  ],
  imports: [CommonModule, SharedModule],
  providers: [RecipeService],
  exports: [RecipesComponent],
})
export class RecipesModule {}

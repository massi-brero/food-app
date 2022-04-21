import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RecipeService } from './services/recipe.service'
import { RecipesComponent } from './recipes.component'
import { RecipesListComponent } from './recipes-list/recipes-list.component'
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component'
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component'
import { SharedModule } from '../shared/shared.module'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RouterModule } from '@angular/router'
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RecipesRoutingModule } from './recipes-routing/recipes-routing.module'

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailsComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipesEditComponent,
  ],
  imports: [
    RecipesRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule {}

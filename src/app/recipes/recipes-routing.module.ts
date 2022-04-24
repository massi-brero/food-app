import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {RecipesComponent} from './recipes.component'
import {AuthGuard} from '../auth/guards/auth.guard'
import {RecipeStartComponent} from './recipe-start/recipe-start.component'
import {RecipesEditComponent} from './recipes-edit/recipes-edit.component'
import {RecipesDetailsComponent} from './recipes-details/recipes-details.component'
import {RecipesResolverService} from './services/recipes-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'new',
        component: RecipesEditComponent,
      },
      {
        path: ':id',
        component: RecipesDetailsComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipesEditComponent,
      },
    ],
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class RecipesRoutingModule {}

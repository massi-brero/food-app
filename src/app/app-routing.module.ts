import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesModule} from "./recipes/recipes.module";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RecipesModule],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

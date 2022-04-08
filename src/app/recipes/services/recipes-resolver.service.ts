import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Recipe } from '../recipe.model'
import { Observable } from 'rxjs'
import { DataStorageService } from '../../shared/services/data-storage.service'
import {RecipeService} from './recipe.service'

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private storageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Recipe[] {
    const recipes = this.recipesService.allRecipes

    if (recipes.length === 0) {
      return this.storageService.fetchAll()
    } else {
      return recipes
    }

  }
}

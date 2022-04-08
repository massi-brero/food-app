import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RecipeService } from '../../recipes/services/recipe.service'
import { environment } from '../../../environments/environment'
import { Recipe } from '../../recipes/recipe.model'
import { map, tap } from 'rxjs/operators'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  save(): void {
    const recipes = this.recipeService.allRecipes
    this.http
      .put<Recipe[]>(`${environment.apiUrl}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(response)
      })
  }

  fetchAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes.json`).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ?? [],
          }
        })
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes)
      })
    )
  }
}

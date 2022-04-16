import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  save(): void {
    const recipes = this.recipeService.allRecipes
    this.http
      .put<Recipe[]>(`${environment.apiUrl}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(response)
      })
  }
  // .subscribe((user: User) => {
  //
  // })
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

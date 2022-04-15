import { Injectable } from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import { RecipeService } from '../../recipes/services/recipe.service'
import { environment } from '../../../environments/environment'
import { Recipe } from '../../recipes/recipe.model'
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { AuthService } from '../../auth/services/auth.service'
import { User } from '../../auth/models/user'

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
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((user: User) => {
        return this.http.get<Recipe[]>(
          `${environment.apiUrl}/recipes.json`,
          {
            params: new HttpParams().set('auth', user.token)
          }
        )
      }),
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

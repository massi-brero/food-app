import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RecipesModule } from './recipes/recipes.module'
import { ShoppingListModule } from './shopping-list/shopping-list.module'
import { SharedModule } from './shared/shared.module'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { AuthModule } from './auth/auth.module'

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

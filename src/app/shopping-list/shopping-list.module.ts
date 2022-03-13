import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppingListService} from "./services/shopping-list.service";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShoppingListComponent
  ],
  providers: [ShoppingListService]
})
export class ShoppingListModule { }

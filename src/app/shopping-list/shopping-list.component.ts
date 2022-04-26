import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./services/shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from '../logging.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangedSub: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
  ) { }

  ngOnDestroy(): void {
        this.igChangedSub.unsubscribe();
    }

  ngOnInit(): void {
    this.ingredients = this.slService.allIngredients;
    this.igChangedSub = this.slService.$ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(idx: number) {
    this.slService.startedEditing.next(idx);
  }
}

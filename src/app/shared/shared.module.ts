import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent, AlertComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [DropdownDirective, LoadingSpinnerComponent, AlertComponent],
})
export class SharedModule {}

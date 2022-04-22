import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { AlertComponent } from './alert/alert/alert.component'
import { DropdownDirective } from './directives/dropdown.directive'
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'
import { PlaceholderDirective } from './placeholder/placeholder.directive'

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
})
export class SharedModule {}

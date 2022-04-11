import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownDirective } from './directives/dropdown.directive'
import { HttpClientModule } from '@angular/common/http'
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [DropdownDirective, LoadingSpinnerComponent],
})
export class SharedModule {}

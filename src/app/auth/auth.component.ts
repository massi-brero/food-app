import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './services/auth.service'
import { AuthResponse } from './models/auth-response'
import {Observable, Subscription} from 'rxjs'
import { Router } from '@angular/router'
import {AlertComponent} from '../shared/alert/alert/alert.component'
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true
  isLoading = false
  error: string = null
  form: FormGroup
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective

  private subscription = new Subscription()

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.form = fb.group({
      email: fb.control(null, [Validators.required, Validators.email]),
      password: fb.control(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit() {
    if (!this.form.valid) {
      return
    }

    let authObservable: Observable<AuthResponse>

    this.isLoading = true
    if (this.isLoginMode) {
      authObservable = this.authService.login(this.form.value)
    } else {
      authObservable = this.authService.signup(this.form.value)
    }

    authObservable.subscribe(
      (response: AuthResponse) => {
        console.log(response)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        console.log(errorMessage)
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
        this.isLoading = false
      }
    )
    this.form.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
    componentRef.instance.message = errorMessage
    this.subscription = componentRef.instance.close.subscribe(() => {
      this.subscription.unsubscribe()
      hostViewContainerRef.clear()
    })
  }

}

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './services/auth.service'
import { AuthResponse } from './models/auth-response'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true
  isLoading = false
  error: string = null
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      email: fb.control(null, [Validators.required, Validators.email]),
      password: fb.control(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  ngOnInit(): void {}

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
        this.isLoading = false
      }
    )
    this.form.reset()
  }
}

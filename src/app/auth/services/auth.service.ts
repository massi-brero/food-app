import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any = null
  private userSubj = new BehaviorSubject<User>(null)
  user$ = this.userSubj.asObservable()

  constructor(private http: HttpClient, private router: Router) {}

  signup(userLogin: UserLogin): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.signUpUrl, {
        ...userLogin,
        returnSecureToken: true,
      })
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          )
        })
      )
  }

  login(userLogin: UserLogin): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.signInUrl, {
        ...userLogin,
        returnSecureToken: true,
      })
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          )
        })
      )
  }

  logout() {
    this.userSubj.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
  }

  autoLogin() {
    const userData: {
      email: string
      id: string
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))

    if (!userData) {
      return
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if (loadedUser.token) {
      this.userSubj.next(loadedUser)
      const expirationPeriod =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationPeriod)
    }
  }

  autoLogout(expirationDuration) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationPeriod = expiresIn * 1000
    const expirationDate = new Date(new Date().getTime() + expirationPeriod)
    const user = new User(email, id, token, expirationDate)
    localStorage.setItem('userData', JSON.stringify(user))

    this.autoLogout(expirationPeriod)
    this.userSubj.next(user)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred!'

    switch (error?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists.'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exists.'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is not correct.'
        break
      default:
        errorMessage = 'An unknown error occurred!'
    }

    return throwError(errorMessage)
  }
}

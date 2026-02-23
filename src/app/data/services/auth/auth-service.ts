import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { IAuthTokenResponse } from './auth-service.interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth';

  get isAuth() {
    return !!this.cookieService.get('accessToken')
  }

  get accessToken() {
    return this.cookieService.get('accessToken')
  }

  get refreshToken() {
    return this.cookieService.get('refreshToken')
  }

  saveTokens(res: IAuthTokenResponse) {
    this.cookieService.set('accessToken', res['access_token'])
    this.cookieService.set('refreshToken', res['refresh_token'])
  }

  login(payload: {username: string, password: string}) {
    const formData = new FormData()
    formData.append('username', payload.username)
    formData.append('password', payload.password)

    return this.http.post<IAuthTokenResponse>(`${this.baseApiUrl}/token`, formData).pipe(
      tap(res =>this.saveTokens(res))
    )
  }

  logout() {
    this.cookieService.delete('accessToken')
    this.cookieService.delete('refreshToken')
  }

  refreshAuth() {
    return this.http.post<IAuthTokenResponse>(`${this.baseApiUrl}/refresh`, {
      refresh_token: this.refreshToken
    }).pipe(
      tap(res => this.saveTokens(res)),
      catchError(err => {
        this.logout()
        return throwError(() => err)
      })
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProfile } from './profile-service.interfaces';
import { Pagable } from '../../interfaces/pagable.interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/account';
  me = signal<IProfile | null>(null)

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}/test_accounts`)
  }

  getMe() {
    return this.http.get<IProfile>(`${this.baseApiUrl}/me`).pipe(
      tap(res => this.me.set(res))
    )
  }

  getSubscribers() {
    return this.http.get<Pagable<IProfile>>(`${this.baseApiUrl}/subscriptions/`)
      .pipe(map(res => res.items.slice(0, 3)))
  }
}

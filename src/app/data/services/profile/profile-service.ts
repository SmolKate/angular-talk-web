import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProfile } from './profile-service.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/account';  
  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}/test_accounts`)
  }
}

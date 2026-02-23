import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile/profile-service';
import { IProfile } from '../../data/services/profile/profile-service.interfaces';
import { ProfileCard } from "../../common-ui/profile-card/profile-card";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, AsyncPipe],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles$: Observable<IProfile[]>

  constructor() {
    this.profiles$ = this.profileService.getTestAccounts()
  }
}

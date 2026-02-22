import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profileServise';
import { IProfile } from '../../data/interfaces/profileService.interfaces';
import { ProfileCard } from "../../common-ui/profile-card/profile-card";

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles: IProfile[] | null = null

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(value => {
        this.profiles = value
        console.log(this.profiles)
    });
  }
}

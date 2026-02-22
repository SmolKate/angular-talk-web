import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from "./common-ui/profile-card/profile-card";
import { ProfileService } from './data/services/profileServise';
import { IProfile } from './data/interfaces/profileService.interfaces';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('talk-web');
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

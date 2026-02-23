import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SideBar } from "../side-bar/side-bar";
import { ProfileService } from '../../data/services/profile/profile-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SideBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  profileService = inject(ProfileService)

  ngOnInit() {
    this.profileService.getMe().subscribe()
  }
}

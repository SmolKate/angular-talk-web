import { Component, inject } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { ActivatedRoute, RouterOutlet, RouterLinkWithHref } from "@angular/router";
import { ProfileService } from '../../data/services/profile/profile-service';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";
import { PostList } from "./post-list/post-list";

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, RouterOutlet, AsyncPipe, ImgUrlPipe, RouterLinkWithHref, PostList],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  me$ = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribers(5)

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$
      
      return this.profileService.getProfile(id)
    })
  )
}

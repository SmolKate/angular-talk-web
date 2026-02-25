import { Component, Input, input } from '@angular/core';
import { IProfile } from '../../data/services/profile/profile-service.interfaces';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";
import { Svg } from "../svg/svg";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile-header',
  imports: [ImgUrlPipe, Svg, RouterLink],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {
  @Input() isEditButton? = true

  profile = input<IProfile>()

}

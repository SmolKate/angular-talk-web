import { Component, Input } from '@angular/core';
import { IProfile } from '../../../data/services/profile/profile-service.interfaces';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url-pipe";
import { RouterLink } from '@angular/router';
import { Svg } from "../../svg/svg";

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe, RouterLink, Svg],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss',
})
export class SubscriberCard {
  @Input() profile!: IProfile;
  @Input() redirectLink?: string;
}

import { Component, inject } from '@angular/core';
import { Svg } from "../svg/svg";
import { SubscriberCard } from "./subscriber-card/subscriber-card";
import { RouterLink } from "@angular/router";
import { ProfileService } from '../../data/services/profile/profile-service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  imports: [Svg, SubscriberCard, RouterLink, AsyncPipe],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  profileServices = inject(ProfileService)

  subscribers$ = this.profileServices.getSubscribers()
  meProfile = this.profileServices.me

  menuItems = [
    {
      icon: 'home',
      label: 'Моя страница',
      link: '/profile/me'
    },
    {
      icon: 'chat',
      label: 'Чаты',
      link: '/chats'
    },
    {
      icon: 'search',
      label: 'Поиск',
      link: '/search'
    },
  ]

  ngOnInit() {
    firstValueFrom(this.profileServices.getMe())
  }
}

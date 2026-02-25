import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { ProfileService } from '../../data/services/profile/profile-service';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule, AsyncPipe],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)
  me$ = toObservable(this.profileService.me)
  stack$ = signal<string[]>([])

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  })

  constructor() {
    effect(() => {
      const profile = this.profileService.me()
      this.stack$.set(profile?.stack ?? [])
      this.form.patchValue({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        username: profile?.username,
        description: profile?.description,
      })
    })
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if (this.form.invalid) return

    const { stack, ...restFormValues } = this.form.value
    //@ts-ignore
    this.profileService.updateProfile({ stack: [...this.stack$(), stack], ...restFormValues }).subscribe((res) => {
      this.stack$.set(res.stack)
      this.form.patchValue({ stack: '' })
    })
  }
}



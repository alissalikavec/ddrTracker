import { Component } from '@angular/core';
import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'settings',
  template: require('./settings.html'),
})
export class SettingsComponent {
  user = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {other: undefined};
  message = '';
  submitted = false;
  AuthService;

  static parameters = [AuthService];
  constructor(_AuthService_) {
    this.AuthService = _AuthService_;
  }

  changePassword(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

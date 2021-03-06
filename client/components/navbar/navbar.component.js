import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'navbar',
  template: require('./navbar.html')
})
export class NavbarComponent {
  isCollapsed = true;
  isLoggedIn;
  isAdmin;
  currentUser = {};
  menu = [{
    title: 'Home',
    state: 'main',
  }];

  static parameters = [AuthService, StateService];
  constructor(authService, stateService) {
    this.AuthService = authService;
    this.StateService = stateService;

    this.reset();

    this.AuthService.currentUserChanged.subscribe(user => {
      this.currentuser = user;
      this.reset();
    });
  }

  reset() {
    this.AuthService.isLoggedIn().then(is => {
      this.isLoggedIn = is;
    });
    this.AuthService.isAdmin().then(is => {
      this.isAdmin = is;
    });
    this.AuthService.getCurrentUser().then(user => {
      this.currentUser = user;
    });
  }

  logout() {
    let promise = this.AuthService.logout();
    this.StateService.go('login'); return promise;
  }}

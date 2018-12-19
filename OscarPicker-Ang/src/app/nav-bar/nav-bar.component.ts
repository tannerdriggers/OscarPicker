import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../core/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: User;

  navbarOpen = false;

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}

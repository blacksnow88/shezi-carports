import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Api_Module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  isLoggegIn(): boolean {
    const user: UserModel = JSON.parse(localStorage.getItem('currentUser'));
    return !!user && !!user.token && user.token.length && !!user.role ;
  }

}

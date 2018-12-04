import { Component, OnInit } from '@angular/core';
import { UsersService, LoginModel, UserModel } from 'src/app/Api_Module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  loginReq: LoginModel;
  loading: boolean;
  returnUrl: string;

  ngOnInit() {
    this.loginReq = {};
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login() {
    this.loading = true;
    this.usersService.authenticate(this.loginReq).subscribe((resp) => {
      this.loading = false;
      const user: UserModel = resp;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate([this.returnUrl]);
    },
      error => {
        alert('Login Failed!');
        this.loading = false;
      });
  }

}

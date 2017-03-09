import { Component, OnInit } from '@angular/core';
import { UsersServices } from '../../services/users.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UsersServices ]
})
export class LoginComponent implements OnInit {

  public error: any;
  public authed: boolean;

  constructor(private usersServices: UsersServices, private router: Router) {

  }

  ngOnInit() {
  }

  login(event, email, password) {
    this.error = null;
    event.preventDefault();

    this.usersServices.login(email, password).then((data) => {
        console.log(data);
        if (data.provider === 4)
          this.authed = true;
          // Send them to the homepage if they are logged in
          this.router.navigate(['']);
    })
    .catch((error: any) => {
      if (error) {
        this.error = error;
        console.log(this.error);
      }
    });
  }
}

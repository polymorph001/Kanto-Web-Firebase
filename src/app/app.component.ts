import { Component } from '@angular/core';
import { UsersServices } from './services/users.service';
import { Router } from "@angular/router";

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  public isLoggedIn: boolean;

  constructor(public usersServices: UsersServices, private router: Router) {
    // This asynchronously checks if our user is logged it and will automatically
     // redirect them to the Login page when the status changes.
     // This is just a small thing that Firebase does that makes it easy to use.
     this.usersServices.af.auth.subscribe(
       (auth) => {
         if(auth == null) {
           console.log("Not Logged in.");

           this.isLoggedIn = false;
           this.router.navigate(['login']);
         }
         else {
           console.log("Successfully Logged in.");
           // Set the Display Name and Email so we can attribute messages to them
           this.usersServices.displayName = auth.auth.email;
           this.usersServices.email = auth.auth.email;
           this.usersServices.uid = auth.uid;

           // Might needs this later
           this.usersServices.getUserInfo(auth.uid)
            .subscribe((userInfo) => {
              console.log(userInfo);
              this.usersServices.userInfo = userInfo;
            });

           this.isLoggedIn = true;
           //this.router.navigate(['']);
         }
       }
     );
   }

   logout() {
     this.usersServices.logout();
   }

}

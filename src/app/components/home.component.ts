import { Component } from '@angular/core';
import { LunchService } from '../services/lunch.service';
import { UsersServices } from '../services/users.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [ LunchService, UsersServices ]
})
export class HomeComponent {
  lunch: any;
  user: any;

  constructor( private lunchService: LunchService,
          private usersServices: UsersServices) {
    this.lunchService.getNextLunch()
      .subscribe (res => {
        let ll = res[0];
        console.log(ll)
        this.usersServices.getUserForKey(ll.userId)
          .subscribe (user => {
            console.log(user);
            this.user = user;
            this.lunch = ll;
          });
      });
  }


}

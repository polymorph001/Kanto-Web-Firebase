import 'rxjs/add/operator/first';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LunchService {

  constructor(private af: AngularFire) {

  }

  createLunch(date:Date, employee: any) {
    const lunches = this.af.database.list('/lunches');
    lunches.push({ date: date.getTime(), userId: employee.$key });
  }

  getNextLunch() {
    return this.af.database.list('/lunches/', {
      query: {
        orderByChild: 'date',
        limitToLast: 1
      }
    })
    .first()
    .map((lunch) => {
      return lunch == null ? null : lunch[0];
    })
    .flatMap((lunch) => {
      if (lunch == null) {
        return Observable.of(null);
      }

      return this.af.database.list('/lunches/' + lunch.$key + '/users/')
        .map((users) => {
          //console.log(users);

          lunch.users = users;
          let accepted = 0;
          for (let user of lunch.users) {
            //console.log(user);
            if (user.accept) {
              accepted++;
            }
          }
          lunch.users.total = Object.keys(lunch.users).length;
          lunch.users.accepted = accepted;
          lunch.users.rejected = (lunch.users.total - lunch.users.accepted);
          return lunch;
        });
    })
  }

  acceptLunchInvite(lunch: any, user: any) {
    const lunches = this.af.database.list('/lunches/' + lunch.$key + '/users/');
    lunches.push({ accept: true, userId: user.$key });

  }
}

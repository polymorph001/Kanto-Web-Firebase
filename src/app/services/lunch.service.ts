import 'rxjs/add/operator/first';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class LunchService {

  constructor(private af: AngularFire) {

  }

  createLunch(date:Date, chef: string) {
    const lunches = this.af.database.list('/lunches');
    lunches.push({ date: date.getTime(), chef: chef});
  }

  getNextLunch() {
    return this.af.database.list('/lunches/', {
      query: {
        orderByChild: 'date',
        limitToLast: 1
      }
    }).first();
  }

}

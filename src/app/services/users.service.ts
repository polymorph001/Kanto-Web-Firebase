import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()

export class UsersServices {
    constructor(private af: AngularFire) {

    }
    getUsers() {
        return this.af.database.list('/users');
    }

}

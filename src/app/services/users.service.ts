import 'rxjs/add/operator/first';
import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class UsersServices {
  public user: FirebaseObjectObservable<any>;
  public displayName: string;
  public email: string;
  public uid: string;
  public userInfo: any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
      });
  }

  login(email: string, password: string) {
    return this.af.auth.login({
                email: email,
                password: password,
              });
  }

  logout() {
    return this.af.auth.logout();
  }

  getUsers() {
      return this.af.database.list('/users');
  }

  getUserForKey(key: string) {
    return this.af.database.object('/users/' + key);
  }

  getUserInfo(uid: string) {
    return this.af.database.list('/users', {
        query: {
          orderByChild: 'uid',
          equalTo: uid,
          limitToLast: 1
        }
      })
      .first()
      .map((infos) => {
        return infos == null ? null : infos[0];
      });
  }

  insertAllEmployeesForTestingOnly() {
    const users = [ {
      "BirthDate" : "20-Feb-1977",
      "CellNumber" : "084 582 8871",
      "Epos" : "richard@polymorph.co.za",
      "FirstName" : "Richard",
      "LastName" : "Barry",
      "MiddleName" : "Malan",
      "Password" : 12345
    }, {
      "BirthDate" : "6-Mar-1976",
      "CellNumber" : "082 321 8774",
      "Epos" : "wim@polymorph.co.za",
      "FirstName" : "Jeffrey",
      "LastName" : "Morris",
      "MiddleName" : "William",
      "Password" : 12345
    }, {
      "BirthDate" : "1-Sep-1984",
      "CellNumber" : "084 682 9683",
      "Epos" : "dawid@polymorph.co.za",
      "FirstName" : "Dawid",
      "LastName" : "Van Graan",
      "MiddleName" : "Hendrik",
      "Password" : 12345
    }, {
      "BirthDate" : "18-Feb-1978",
      "CellNumber" : "082 830 3508",
      "Epos" : "colin@polymorph.co.za",
      "FirstName" : "Colin",
      "LastName" : "Payne",
      "MiddleName" : "Attwood",
      "Password" : 12345
    }, {
      "BirthDate" : "3-Aug-1975",
      "CellNumber" : "084 987 8888",
      "Epos" : "mitch@polymorph.co.za",
      "FirstName" : "Mitchell",
      "LastName" : "Wong Ho",
      "MiddleName" : "Andrew Patrick",
      "Password" : 12345
    }, {
      "BirthDate" : "1-Jul-1970",
      "CellNumber" : "076 973 7701",
      "Epos" : "johan@polymorph.co.za",
      "FirstName" : "Johan",
      "LastName" : "Nilsson",
      "MiddleName" : "Peter",
      "Password" : 12345
    }, {
      "BirthDate" : "28-Aug-1970",
      "CellNumber" : "076 416 6700",
      "Epos" : "office@polymorph.co.za",
      "FirstName" : "Helena",
      "LastName" : "Van Wyk",
      "MiddleName" : "",
      "Password" : 12345
    }, {
      "BirthDate" : "13-Dec-1982",
      "CellNumber" : "074 809 1629",
      "Epos" : "anthony@polymorph.co.za",
      "FirstName" : "Anthony",
      "LastName" : "La Grange",
      "MiddleName" : "Michael",
      "Password" : 12345
    }, {
      "BirthDate" : "23-Sep-1969",
      "CellNumber" : "082 456 2812",
      "Epos" : "duke@polymorph.co.za",
      "FirstName" : "Doukas",
      "LastName" : "Coulbanis",
      "MiddleName" : "",
      "Password" : 12345
    }, {
      "BirthDate" : "25-Sep-1978",
      "CellNumber" : "082 322 9133",
      "Epos" : "hilda@polymorph.co.za",
      "FirstName" : "Hilda",
      "LastName" : "Joubert",
      "MiddleName" : "",
      "Password" : 12345
    }, {
      "BirthDate" : "4-Jan-1976",
      "CellNumber" : "082 566 2877",
      "Epos" : "marietjie@polymorph.co.za",
      "FirstName" : "Maria",
      "LastName" : "McDonald",
      "MiddleName" : "Susanna",
      "Password" : 12345
    }, {
      "BirthDate" : "4-Jun-1978",
      "CellNumber" : "082 441 1631",
      "Epos" : "hsmith@polymorph.co.za",
      "FirstName" : "Herman",
      "LastName" : "Smith",
      "MiddleName" : "Gerhard",
      "Password" : 12345
    }, {
      "BirthDate" : "20-Nov-1987",
      "CellNumber" : "072 386 3855",
      "Epos" : "pdroux@gmail.com",
      "FirstName" : "Paul",
      "LastName" : "Roux",
      "MiddleName" : "Daniël",
      "Password" : 12345
    }, {
      "BirthDate" : "25-Apr-1991",
      "CellNumber" : "083 263 7333",
      "Epos" : "ryno@polymorph.co.za",
      "FirstName" : "Ryno",
      "LastName" : "Claassen",
      "MiddleName" : "Johan",
      "Password" : 12345
    }, {
      "BirthDate" : "18-Nov-1991",
      "CellNumber" : "076 550 3238",
      "Epos" : "percy@polymorph.co.za",
      "FirstName" : "Gideon",
      "LastName" : "Groenewald",
      "MiddleName" : "Percival",
      "Password" : 12345
    }, {
      "BirthDate" : "11-Nov-1982",
      "CellNumber" : "082 926 8327",
      "Epos" : "jpretorius@polymorph.co.za",
      "FirstName" : "Johan",
      "LastName" : "Pretorius",
      "MiddleName" : "Frederik",
      "Password" : 12345
    }, {
      "BirthDate" : "14-Dec-1982",
      "CellNumber" : "083 735 3881",
      "Epos" : "madi@polymorph.co.za",
      "FirstName" : "Madaleen",
      "LastName" : "Duvenhage",
      "MiddleName" : "Susan",
      "Password" : 12345
    }, {
      "BirthDate" : "11-Apr-1991",
      "CellNumber" : "083 309 9157",
      "Epos" : "nicolaas@polymorph.co.za",
      "FirstName" : "Nicolaas",
      "LastName" : "Vercuiel",
      "MiddleName" : "Johannes",
      "Password" : 12345
    }, {
      "BirthDate" : "25-Oct-1979",
      "CellNumber" : "084 734 2830",
      "Epos" : "christine@polymorph.co.za",
      "FirstName" : "Christine",
      "LastName" : "Hansmann",
      "MiddleName" : "Henriëtte",
      "Password" : 12345
    }, {
      "BirthDate" : "21-Sep-1975",
      "CellNumber" : "083 276 9071",
      "Epos" : "pieter@polymorph.co.za",
      "FirstName" : "Petrus",
      "LastName" : "Smit",
      "MiddleName" : "Albertus",
      "Password" : 12345
    }, {
      "BirthDate" : "25/08/1985",
      "CellNumber" : "072 262 1278",
      "Epos" : "russel@polymorph.co.za",
      "FirstName" : "Russel",
      "LastName" : "Mupfumira",
      "MiddleName" : "",
      "Password" : 12345
    } ];

    const usersRef = this.af.database.list('/employees');
    for (var i=0; i < users.length; i++) {
      usersRef.push(users[i]);
    }
  }
}

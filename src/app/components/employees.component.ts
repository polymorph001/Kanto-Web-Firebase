import { Component } from '@angular/core';
import { UsersServices } from '../services/users.service';

@Component({
  selector: 'employees',
  templateUrl: 'employees.component.html',
  providers: [ UsersServices ]
})
export class EmployeesComponent {
      users: Users[];

      constructor(private usersService: UsersServices) {
          this.usersService.getUsers().subscribe (users => {
              this.users = users;
            })
      }
}

interface Users {
    FirstName: string;
    LastName: string;

}

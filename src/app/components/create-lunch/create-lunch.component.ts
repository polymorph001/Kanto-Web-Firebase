import { Component, OnInit } from '@angular/core';
import { UsersServices } from '../../services/users.service';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-create-lunch',
  templateUrl: './create-lunch.component.html',
  styleUrls: ['./create-lunch.component.css'],
  providers: [ UsersServices ]
})
export class CreateLunchComponent implements OnInit {
  public error: any;

  public dt: Date = new Date();
  public minDate: Date = void 0;

  public employees: any[];
  public chef: string = "";

  constructor(private usersService: UsersServices) {
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1);
    //this.employees = usersService.getUsers();
    this.usersService.getUsers()
      .subscribe (res => {
        console.log(res);
        this.employees = res;
      })
  }

  ngOnInit() {
  }

  public createLunch(): void {
    this.error = null;
    // Check the values
    if (this.chef=="") {
      this.error = "Please select a chef";
    }

    alert("Create " + this.dt + " for chef " + this.chef);

  }

}

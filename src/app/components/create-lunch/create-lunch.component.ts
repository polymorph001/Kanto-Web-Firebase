import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersServices } from '../../services/users.service';
import { LunchService } from '../../services/lunch.service';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-create-lunch',
  templateUrl: './create-lunch.component.html',
  styleUrls: ['./create-lunch.component.css'],
  providers: [ UsersServices, LunchService ]
})
export class CreateLunchComponent implements OnInit {
  @ViewChild('lunchCreatedModal') public lunchCreatedModal:ModalDirective;

  public error: any;

  public dt: Date = new Date();
  public minDate: Date = void 0;

  public employees: any[];
  public chef: string = "";

  constructor(private usersService: UsersServices,
            private lunchService: LunchService,
            private router: Router) {
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
      return;
    }
    let employee = this.employees.find(e => e.FirstName == this.chef);
    if (employee == null) {
      this.error = "Please select a valid chef";
      return;
    }
    
    this.lunchService.createLunch(this.dt, employee);
    this.showLuchCreatedModal();
  }

  public showLuchCreatedModal():void {
      this.lunchCreatedModal.show();
  }

  public hideLunchCreatedModal(): void {
      this.lunchCreatedModal.hide();

      this.router.navigate(['/']);
  }
}

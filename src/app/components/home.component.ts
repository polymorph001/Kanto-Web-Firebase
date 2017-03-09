import { Component } from '@angular/core';
import { LunchService } from '../services/lunch.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [ LunchService ]
})
export class HomeComponent {
  lunch: any;

  constructor( private lunchService: LunchService) {
    this.lunchService.getNextLunch()
    .subscribe (res => {
      // NOT THE BEST
      console.log(res);
      this.lunch = res[0];
    })
  }

}

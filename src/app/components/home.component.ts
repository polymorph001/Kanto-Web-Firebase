import { Component } from '@angular/core';
import { LunchService } from '../services/lunch.service';
import { UsersServices } from '../services/users.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styles: [`
    #player{
       text-align: center;
    }
    .range-container{
      display: flex;
      justify-content: center;
    }
    .range-container input{
      width:200px;
      margin-bottom: 10px;
    }
  `],
  providers: [ LunchService, UsersServices ]
})
export class HomeComponent {

    lunch: any;
  
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;


  constructor( private lunchService: LunchService,
          private usersServices: UsersServices) {
    this.lunchService.getNextLunch()
    .subscribe (res => {
      // NOT THE BEST
      console.log(res);
      this.lunch = res[0];
    })
this.lottieConfig = {
      path: './src/app/components/bounching_ball.json',
      autoplay: true,
      loop: true
    };
  }

   handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

    pause() {
    this.anim.pause();
  }

    setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

};

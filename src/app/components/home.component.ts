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
  public lunch: any;

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor( private lunchService: LunchService,
    private usersServices: UsersServices) {
      this.lunchService.getNextLunch()
        .filter((lunch) => lunch != null)
        .flatMap((lunch) => {
          return this.usersServices.getUserForKey(lunch.userId)
            .map(user => {
              lunch.chef = user;
              return lunch;
          });
        })
        .subscribe((ll) => {
          this.lunch = ll;
        });

        this.lottieConfig = {
          path: 'assets/bounching_ball.json',
          autoplay: true,
          loop: true
        };
  }

  rejectLunchInvite() {
    // Mark in DB Reject
    alert("NOT COOL MAN");
  }

  acceptLunchInvite() {
    // Mark in DB accept
    this.lunchService.acceptLunchInvite(this.lunch, this.lunch.user);
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

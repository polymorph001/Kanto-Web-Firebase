import { Component } from '@angular/core';
import { LunchService } from '../services/lunch.service';
import { UsersServices } from '../services/users.service';

export enum LunchState {unknown = 1, accepted = 2, rejected = 3}

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
  providers: [ LunchService ]
})
export class HomeComponent {
  public lunch: any;

  // allows you to use AgentStatus in template
  public LunchState = LunchState;
  public lunchState: LunchState = LunchState.unknown;

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor( private lunchService: LunchService,
    private usersServices: UsersServices) {
      this.lunchService.getNextLunch()
        .filter((lunch) => lunch != null)
        .flatMap((lunch) => {
          // Get the person cooking
          return this.usersServices.getUserForKey(lunch.userId)
            .map(user => {
              lunch.chef = user;
              // Check if I'm the one cooking
              lunch.meCooking = (user.uid == this.usersServices.uid);
              return lunch;
          });
        })
        .map((lunch) => {
          // Check what logged in user accept/reject state is
          this.lunchState = LunchState.unknown;
          if (lunch.users != null && lunch.users.length > 0) {
            let me = lunch.users.find(e => e.userId == this.usersServices.uid);
            if (me != null) {
              this.lunchState = me.accept ? LunchState.accepted : LunchState.rejected;
            }
          }
          return lunch;
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
    this.lunchService.acceptLunchInvite(this.lunch, this.usersServices.uid);
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

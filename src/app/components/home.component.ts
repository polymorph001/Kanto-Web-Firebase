import { Component } from '@angular/core';
import { LunchService } from '../services/lunch.service';
import { UsersServices } from '../services/users.service';

export enum LunchState {unknown = 1, accepted = 2, rejected = 3}

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [ LunchService ]
})
export class HomeComponent {

  public isCollapsed:boolean = false;
 
  public collapsed(event:any):void {
    console.log(event);
  }
 
  public expanded(event:any):void {
    console.log(event);
  }
  public lunch: any;

  // allows you to use AgentStatus in template
  public LunchState = LunchState;
  public lunchState: LunchState = LunchState.unknown;
  public attending: string = "";

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
            lunch.me = lunch.users.find(e => e.userId == this.usersServices.uid);
            if (lunch.me != null) {
              this.lunchState = lunch.me.accept ? LunchState.accepted : LunchState.rejected;
            }
          }
          return lunch;
        })
        .subscribe((ll) => {
          this.lunch = ll;

          // List iterate
          this.lunch.rUsers = [];
            for (var i =0; i < this.lunch.users.length; i++) {
            //for(let user of lunch.users){
              let user = this.lunch.users[i];
              this.usersServices.getUserInfo(user.userId)
              .subscribe((u) => {
                  console.log(u)
                  this.lunch.rUsers.push(u);
                  //this.lunch.users[i] = u
              });
            }
        });

        this.lottieConfig = {
          path: 'assets/bounching_ball.json',
          autoplay: true,
          loop: true
        };
  }

  rejectLunchInvite() {
    // Mark in DB Reject
    this.lunchService.rejectLunchInvite(this.lunch, this.lunch.me, this.usersServices.uid);
  }

  acceptLunchInvite() {
    // Mark in DB accept
    this.lunchService.acceptLunchInvite(this.lunch, this.lunch.me, this.usersServices.uid);
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

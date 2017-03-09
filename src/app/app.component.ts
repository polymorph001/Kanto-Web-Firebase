import { Component } from '@angular/core';
import { UsersServices } from './services/users.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ UsersServices ]
})

export class AppComponent {


}

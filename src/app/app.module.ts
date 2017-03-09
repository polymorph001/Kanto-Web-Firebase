import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/home.component';
import { AboutComponent }  from './components/about.component';
import { EmployeesComponent }  from './components/employees.component';

import { routing }  from './app.routing';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyA2L0MAgxZnzVxgR0V7YYwKqhC-hR3RlhI",
  authDomain: "helena-4a3f6.firebaseapp.com",
  databaseURL: "https://helena-4a3f6.firebaseio.com",
  storageBucket: "helena-4a3f6.appspot.com",
  messagingSenderId: "558644249736"
};


@NgModule({
  imports:[
    BrowserModule, FormsModule, HttpModule, routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, EmployeesComponent ],
  bootstrap:    [ AppComponent ],
})

export class AppModule {



}

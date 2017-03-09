import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import { RoundPipe } from './pipes/round.pipe';

import { ModalModule } from 'ng2-bootstrap/modal';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { MomentModule } from 'angular2-moment';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { AlertModule } from 'ng2-bootstrap/alert';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/home.component';
import { AboutComponent }  from './components/about.component';
import { EmployeesComponent }  from './components/employees.component';

import { routing }  from './app.routing';
import { CreateLunchComponent } from './components/create-lunch/create-lunch.component';

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
    AngularFireModule.initializeApp(firebaseConfig),
    DatepickerModule.forRoot(), MomentModule, TypeaheadModule.forRoot(),
    DropdownModule.forRoot(), ButtonsModule.forRoot(), AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, EmployeesComponent, CreateLunchComponent, RoundPipe ],
  bootstrap:    [ AppComponent ],
})

export class AppModule {



}

import { Component, OnInit } from '@angular/core';
import { LoadingAnimateService } from 'ng2-loading-animate';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

constructor(private _loadingSvc: LoadingAnimateService) { }


  ngOnInit() {
  }

start() {
  this._loadingSvc.setValue(true);
}
stop() {
  this._loadingSvc.setValue(false);
}


}

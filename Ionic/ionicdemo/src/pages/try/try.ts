import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { cordova } from 'cordova';

@Component({
  selector: 'page-try',
  templateUrl: 'try.html'
})
export class TryPage {

  constructor(public navCtrl: NavController) {
	cordova.InAppBrowser.open('http://www.someweb.com', '_blank', 'location=yes')  	
  }

}
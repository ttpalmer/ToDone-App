import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { SignUpPage } from './../sign-up/sign-up';

import { AngularFireAuth } from 'angularfire2/auth';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LaunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launch',
  templateUrl: 'launch.html',
})
export class LaunchPage {

  homepage = HomePage;

  constructor(private uAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaunchPage');
  }

  SignIn()
  {
    
    this.navCtrl.push(LoginPage);
  }
  Register()
  {
    this.navCtrl.push(SignUpPage);
  }
 

}

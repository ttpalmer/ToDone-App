import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = '';  
  password: string = '';

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async doSignin()
  {
    var User = {
      email: this.email,
      password: this.password
    }
    try {
    const result = this.afAuth.auth.signInWithEmailAndPassword(User.email,User.password);
    console.log(result);
    console.log("Sign in successful email " + User.email + "password: " + User.password );
    this.navCtrl.push(HomePage);
    }
    catch(e)
    {
      console.error(e);
    }
  }

}

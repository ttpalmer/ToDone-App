import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { SignUpPage } from './../sign-up/sign-up';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  loginForm: FormGroup;
	loginError: string;

  homepage = HomePage;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,fb: FormBuilder, private auth: AuthServiceProvider) {
    this.loginForm = fb.group({
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
			password: new FormControl ('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaunchPage');
  }

  Register()
  {
    setTimeout(() => {
      this.navCtrl.push(SignUpPage, {
          duration: 200, // The length in milliseconds the animation should take.
      });
  },1000);
  }

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => this.loginError = error.message
			);
    }
 

}

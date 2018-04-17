import { HomePage } from './../home/home';
import { MenuPage } from './../menu/menu';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
 // email: string = '';  
 // password: string = '';

  loginForm: FormGroup;
	loginError: string;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth: AuthServiceProvider) {
    this.loginForm = fb.group({
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
			password: new FormControl ('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 /* async doSignin()
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
  }*/

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

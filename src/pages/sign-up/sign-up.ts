import { HomePage } from './../home/home';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';


/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
 /* password: string = '';
  username: string = '';
  verify: string = '';
  email: string = '';*/

  signupError: string;
	form: FormGroup;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, fb : FormBuilder, private auth: AuthServiceProvider) {
    this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

 

  signup() {
		let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => this.navCtrl.setRoot(HomePage),
			error => this.signupError = error.message
		);
  }

  goBack()
  {
    this.navCtrl.pop();
  }

}

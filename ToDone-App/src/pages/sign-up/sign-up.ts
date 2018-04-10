import { HomePage } from './../home/home';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  password: string = '';
  username: string = '';
  verify: string = '';
  email: string = '';

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

  async doRegister()
  {
     var user =
    {
      username: this.username,
      email: this.email,
      password: this.password
    }
    try{
   const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
   var nuser = this.afAuth.auth.currentUser;
   nuser.updateProfile({
     displayName: user.username,
     photoURL: null
   }).then(function(){
     //Update Successful
     console.log(nuser.displayName);
   }).catch(function(error){
     //An error happend
   });
    }
    catch(e){
      console.error(e);
    }
  
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

}

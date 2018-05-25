import { TabsPage } from './../tabs/tabs';
import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { SignUpPage } from './../sign-up/sign-up';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FirebaseApp } from 'angularfire2';

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

  userData: any;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
     fb: FormBuilder, private auth: AuthServiceProvider, private facebook: Facebook, private platform: Platform,
    public toastCtrl: ToastController) {
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
    this.auth.signInWithEmail(credentials).then(
        () => {
          let toast  =  this.toastCtrl.create({
            message: 'You have successfully logged in ' + this.afAuth.auth.currentUser.email ,
            duration: 2000,
          });
          toast.present();
          this.navCtrl.setRoot(TabsPage)
        }
        ,
				error => {
          this.loginError = error.message
          let toast  =  this.toastCtrl.create({
            message: 'Your login is incorrect please try again ' ,
            duration: 2000,
          });
          toast.present();
        }
      );
      
    }

    presentToast()
    {
      this.afAuth.app.firestore().collection('users')
      if(this.afAuth.auth.currentUser != null){
        let toast  =  this.toastCtrl.create({
          message: 'You have successfully logged in ' + this.afAuth.auth.currentUser.email ,
          duration: 2000,
        });
        toast.present();
      }
      else if(this.afAuth.auth.currentUser == null){
        let toast  =  this.toastCtrl.create({
          message: 'Your login is incorrect please try again ' ,
          duration: 2000,
        });
        toast.present();
      }
    }

    signInWithFaceboook(){
  
      if(this.platform.is('cordova')){
        return this.facebook.login(['email', 'public_profile']).then(res => {
          const facebookCredentials = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          console.log(facebookCredentials);
          return firebase.auth().signInWithCredential(facebookCredentials).then(()=> this.navCtrl.setRoot(TabsPage));
        })
      }
      else{
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).
        then(()=> this.navCtrl.setRoot(TabsPage),
          result => console.log(result));
        ;
      }
      
  }

  resetPassword(){

    let data = this.loginForm.value;

    if (data.email == '') {
      let toast  =  this.toastCtrl.create({
        message: 'Please enter your email address' ,
        duration: 3000,
      });
      toast.present();
			return;
		}

    var email = data.email
    this.auth.resetPassword(email).then(success =>{
      let toast  =  this.toastCtrl.create({
        message: 'An email was sent to ' + email + ' with instructions on how to reset your password' ,
        duration: 3000,
      });
      toast.present();

      console.log("Password reset was sent to "+ email);
    }); 
  }
 

}
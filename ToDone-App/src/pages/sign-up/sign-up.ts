import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
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

}

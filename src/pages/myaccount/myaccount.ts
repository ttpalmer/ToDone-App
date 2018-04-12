import { Data } from './../../providers/data/data';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  firstName: any;
  lastName: any;
  userName: any;
  public users = {};
  email:any;
  passwor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AuthServiceProvider, private data: Data) {
     this.users = firebase.auth().currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
    
  }

  userInfo()
  {
    
    this.data.userInfo(this.firstName,this.lastName);
    this. email = this .afAuth.getEmail
  }


 

}

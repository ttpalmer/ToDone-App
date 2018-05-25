import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Users } from './../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Data } from './../../providers/data/data';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import firebase, { User } from 'firebase';
import { DISABLED } from '@angular/forms/src/model';


/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 //TODO
 //        CHANGE TO MY ACCOUNT AND ADD EDIT MY ACCOUNT PAGE TO ADD THIS DATA 
@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyAccountPage {
 
  user: Users = {};
  
  form: FormGroup;

  inactive: boolean = true;
 einactive: boolean = true;
  users: Users[] = [];
  count = 0;
  emailcount = 0;

  usersCollectionRef: AngularFirestoreCollection<Users>;
  usersDocRef: AngularFirestoreDocument<Users>;
  users$: Observable<Users[]>;



  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AuthServiceProvider, private data: Data,
              fb : FormBuilder, public auth: AuthServiceProvider, public afs: AngularFirestore, public alertCtrl: AlertController,
            public toastCtrl: ToastController) {
     this.user =  this.auth.getCurrentUser();
     console.log(this.user.userID); console.log(this.user);
     this.usersCollectionRef = this.afs.collection('Users', ref => ref.where("userID", "==", this.user.userID));

     this.form = fb.group({
			name: [{value:this.user.name,disabled:this.inactive}, Validators.compose([Validators.required, Validators.minLength(2)])],
      userName: [{value: this.user.userName,disabled:this.inactive}, Validators.compose([Validators.required, Validators.minLength(2)])],
      email: [{value: this.user.email,disabled:this.inactive}, Validators.compose([Validators.required, Validators.email])],
    
    });
    this.afAuth.getUser().subscribe(users => {
      console.log(users);
      this.users = users;
    });
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
    
  }

  userInfo()
  {
    
    let data = this.form.value;
     
    if(data.name == null || data.userName == null)
    {
       console.log(data);
      data.name = this.user.name;
      data.userName  =this.user.userName;    

    }
    
      let credentials = {
      name: data.name,
      userName: data.userName,
      email :data.email,
    
    };
    console.log(credentials.name);
     
    this.usersDocRef = this.afs.doc(`Users/${this.user.userID}`);
    console.log(credentials, this.user);
    if(credentials.email != this.user.email || credentials.name != this.user.name || credentials.userName != this.user.userName)
    {
    this.auth.updateUser(credentials).then((result)=> {
      let message = 'You have successfully updated your profile ' + this.user.userName; 
      let toast = this.presentToast(message);
      toast.present();
    if(credentials.email!= this.user.email)
    {
    this.changeEmail(credentials.email);
    }
    }).catch(function(error){
      let toast = this.presentToast(error.message);
      toast.present();
      console.log(error);
    }); 
   }
    else{return;}
  }
  changeStatus(){
    
     this.count = this.count + 1
          let zero = 0;
          let result = this.count % 2;

        if (result == zero)
          {
             this.inactive = true;
           console.log(result+ " " + this.inactive);
           
          }
        else  {
          this.inactive = false;
          console.log(result + " " + this.inactive);
          }
    console.log(this.count + " " + this.inactive);
 }

 reauthenticateAlert() {

  
  let alert = this.alertCtrl.create({
    title: 'Please enter your email and password to confirm your identity',
    inputs: [
      {
        name: 'email',
        placeholder: 'Email'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {

          var credentials = {
              email: data.email,
              password: data.password
            }
             this.auth.reauthenticateUser(credentials).then((result)=> {
                // User re-authenticated. 
              if(result.operationType == "reauthenticate")
              {
                console.log('Success');
              let message  = 'You have been successfully reauthenticated ';
              let toast  =  this.presentToast(message);
             toast.present(); 
             alert.dismiss(true);
             return true
                
              }
              else {
                console.log('failed');
                return false;
              }
              //return true
              }).catch((error)=> {
                let message =error.message;
                let toast  =  this.presentToast(message);
                toast.present();
                console.log('failed');
                
                return false;
              });
         
            return false;
          
        }
      }
    ]
  });
  return alert;
}

reauthenticateUser()
{
  let alert = this.reauthenticateAlert();
  alert.present();
  alert.onDidDismiss((data) => {
    console.log('User info', data);
});
}


changeEmail(email)
{

  console.log(email);
  this.auth.updateEmail(email);
}
changeEmailStatus()
{
  this.emailcount = this.emailcount + 1
  let zero = 0;
  let result = this.emailcount % 2;

 if (result == zero)
  {
     this.einactive = true;
   console.log(result+ " " + this.einactive);
  }
  else  {
  this.einactive = false;
  console.log(result + " " + this.einactive);
  let alert = this.alertCtrl.create({
    title: 'Change Email',
    message: 'Are you sure you want to change you email?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('Yes clicked');
          this.reauthenticateUser();
        }
      }
    ]
  });
  alert.present();

  }



console.log(this.emailcount + " " + this.einactive);
}

presentToast(message)
{
  let toast  =  this.toastCtrl.create({
    message: message,
    duration: 3500,
  });
  return toast;
}

}

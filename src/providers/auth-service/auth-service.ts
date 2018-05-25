import { ToastController } from 'ionic-angular';
import { Users } from './../../models/user';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  user : Users = {};
  usersCollectionRef: AngularFirestoreCollection<Users>;
  users$: Observable<Users[]>;
  usersDocRef: AngularFirestoreDocument<Users>;


  

  constructor(public afAuth: AngularFireAuth,  public afs: AngularFirestore, public toastCtrl: ToastController) {
    afAuth.authState.subscribe(user =>{

      
      //let user = firebase.auth().currentUser;
      this.user.email = user.email;
      //this.user.userName = user.displayName;
      this.user.userID = user.uid;
      console.log(this.user);

      this.usersCollectionRef = this.afs.collection('Users', ref => ref.where("userID", "==", this.user.userID));
      this.users$ = this.usersCollectionRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Users;
       this.user.userName = data.userName;
       this.user.name = data.name;
        console.log( data);
        return data;
      });
    });
    });
    
    
  }

  signInWithEmail(credentials) : Promise<void>
  {
    console.log('Signed in with email' + " "+ credentials.email + " " + credentials.password);
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password); 
  }

  getEmail() {
    console.log(firebase.auth().currentUser);
		return this.user.userName && this.user.email;
  }
  signOut(): Promise<void>{
    console.log('You have logged out successfully');
    return this.afAuth.auth.signOut();
    
  }

  signUp(credentials) {
    
    console.log('You have successfully signed up' + " "+ credentials.email + " " + credentials.password);
		return firebase.auth().createUserWithEmailAndPassword(credentials.email,credentials.password).then( newUser => {
      console.log(newUser);
      var rUser: Users = {};
      rUser.email = newUser.email;
      console.log(rUser.email);
      rUser.userID = newUser.uid;
      rUser.userName = newUser.displayName; 
      this.usersCollectionRef.doc(rUser.userID).set(rUser);
      firebase.auth().currentUser.sendEmailVerification();
    });
  }

  updateUser(user)
  {
    firebase.auth().currentUser.updateProfile({
      displayName: this.user.userName,
      photoURL:null
    });
    this.usersDocRef = this.afs.doc(`Users/${this.user.userID}`);
    return this.usersDocRef.update(user);
  }

  getUser()
  {
    return this.users$;
  }
  getCurrentUser(){
    console.log(this.user);
    return this.user;

  }
  resendEmailVerification()
  {
    return firebase.auth().currentUser.sendEmailVerification();
  }

  resetPassword(email)
  {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  reauthenticateUser(credentials)
  {
    
    var oldcredentials = firebase.auth.EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );
    let data = {
       email:credentials.email,
      password: credentials.password
    };
    var reauthenticated = firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(oldcredentials);
  
     return reauthenticated;
   
  }

  updateEmail(email)
  {
    if(email != firebase.auth().currentUser.email){
      
      return firebase.auth().currentUser.updateEmail(email).then((result) => {
           console.log('Success your new email is ' + email );
           console.log(firebase.auth().currentUser);
          let message = 'Your new email is ' + email 
          let alert =this.presentToast(message);
          alert.present();
         }).catch(function(error){
           let alert = this.presentToast(error.message);
           alert.present();
           console.log(error);
           return;
         }); 
    }
    else {
      return
    }
    
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

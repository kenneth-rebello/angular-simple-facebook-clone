import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  currentUser!: firebase.default.User;

  constructor(private store: AngularFirestore, private auth: AngularFireAuth) { 
    this.auth.authState.subscribe(user => {
      if(user){
        this.currentUser = user;
        console.log(this.currentUser);
      }
    })
  }

  getAllPosts = (): Observable<any> =>{
    return this.store.collection<any>('posts', ref => ref.orderBy('time', 'desc'))
    .snapshotChanges()
    .pipe(map(actions => {
      return actions.map(item => {
        return {
          id: item.payload.doc.id, 
          date: new Date(item.payload.doc.data()["time"]),
          ...item.payload.doc.data()
        }
      })
    }));
  }

  postMessage = (message: string, ownerName: string, otherItems: any): void  => {
    this.store.collection('posts').add({
      message,
      title: ownerName,
      user_id: this.currentUser.uid,
      time: firebase.default.firestore.FieldValue.serverTimestamp(),
      ...otherItems
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
}

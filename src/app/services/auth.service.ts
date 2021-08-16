import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData!: Observable<firebase.default.User | null>;
  private currentUser!: User | null;
  private currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>({
    firstName:"",
    lastName:"",
    avatar:"",
    email:"",
    id:""
  });
  defaultAvatar = "https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png";

  constructor(private store: AngularFirestore, 
    private auth: AngularFireAuth,
    private router: Router
  ) { 
    this.userData = auth.authState;

    this.userData.subscribe(user => {
      if(user){
        this.store.collection<User>('users')
          .doc<User>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            if(currentUser!==undefined){
              this.currentUser = currentUser;
              this.currentUser$.next(this.currentUser);
            } else {
              this.currentUser = null;
              this.currentUser$.next(this.currentUser);
            }
          })
      }
    })
  }

  CurrentUser = (): Observable<User | null> => {
    return this.currentUser$.asObservable();
  }

  User = (): Observable<firebase.default.User | null> => {
    return this.userData;
  }

  signUp = (email: string, 
    password: string, 
    firstName: string, 
    lastName:string, 
    avatar:string
  ) => {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        if(res){
          avatar = avatar==="" || avatar===undefined ? this.defaultAvatar : avatar;
          this.store.collection('users').doc(res.user?.uid)
            .set({
              firstName,
              lastName,
              email,
              avatar
            })
              .then(() => {
                this.store.collection<User>('users')
                  .doc<User>(res.user?.uid)
                  .valueChanges()
                  .subscribe(user => {
                    if(user){
                      this.currentUser = user;
                      this.currentUser$.next(this.currentUser)
                    }
                  })
              }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
  }

  signIn = (email:string, password:string) => {
    this.auth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.userData = this.auth.authState;
      this.store.collection<User>('users')
        .doc<User>(res.user?.uid)
        .valueChanges()
        .subscribe(user => {
          if(user){
            this.currentUser = user;
            this.currentUser$.next(this.currentUser)
          }
        })
    })
    .catch
  }

  logout = () => {
    this.auth.signOut()
    .then(() => {
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl('/login');
    })
  }

  searchUserInDataBase = (user_id: string) : Observable<User  | undefined> => {
    return this.store.collection('users').doc<User>(user_id).valueChanges();
  }

}

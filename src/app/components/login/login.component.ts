import { of, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subs.push(this.authService.User().subscribe(user => {
      if(user){
        this.router.navigateByUrl('/');
      }
    }))
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  login = (form: NgForm): void =>{
    const {email, password} = form.value;

    if(form.valid){
      this.authService.signIn(email, password);
      form.resetForm();
    }else{
      return
    }
  }

  openRegister = (): void =>{
    const dialogRef = this.matDialog.open(RegisterComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px',
    });

    dialogRef.afterClosed().subscribe(res =>{
      const {fname, lname, email, password, avatar} = res;
      console.log(res);
      if(res!==undefined){
        this.authService.signUp(email, password, fname, lname, avatar);
      }
    });
    return;
  }
}

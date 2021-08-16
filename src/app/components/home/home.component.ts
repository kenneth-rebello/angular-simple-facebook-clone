import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public images: string[] = [
    'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iji_Mh_Y9JBY/v2/1000x-1.jpg',
    'https://i.pinimg.com/originals/78/75/d7/7875d777fd0cb342527d9840f37194b1.jpg',
    'https://gl-images.condecdn.net/image/Vb5y5JVnB7e/crop/405/f/margot-robbie_glamour_5feb18_gettyimages-914017378_p.jpg',
    'https://www.health-yogi.com/wp-content/uploads/2020/04/IMG_20200406_220901-993x1024.jpg',
    'http://i.imgur.com/w77KDGi.jpg',
    'https://www.refinery29.com/images/9932545.jpg'
  ];

  public posts:any = [];
  public user!: User | null;
  subs: Subscription[] = [];


  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subs.push(this.postService.getAllPosts().subscribe(posts => this.posts = posts));
    this.subs.push(this.authService.CurrentUser().subscribe(user => this.user = user))
  }

  ngOnDestroy(): void{
    this.subs.map(s => s.unsubscribe());
  }

  postMessage = (form:NgForm) => {
    const {message} = form.value;

    this.postService.postMessage(message, `${this.user?.firstName} ${this.user?.lastName}`, {
      avatar: this.user?.avatar,
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
    });
    form.resetForm();
  }

  logout = () =>{
    this.authService.logout();
  }

}

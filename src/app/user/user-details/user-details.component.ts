import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SetLoading } from 'src/app/store/user.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SetLoading({ isLoading: true }));
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.userService.getUser(userId).subscribe(({ data }) => {
          this.user = data;
          this.store.dispatch(SetLoading({ isLoading: false }));
        });
      }
    });
  }
}

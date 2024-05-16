import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SetLoading } from 'src/app/store/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  total_pages: number = 0;

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SetLoading({ isLoading: true }));
    this.userService.getUsers(this.page, this.per_page).subscribe((res) => {
      this.users = res.data;
      this.total = res.total;
      this.total_pages = res.total_pages;
      this.store.dispatch(SetLoading({ isLoading: false }));
    });
  }

  onPageChange(e: any) {
    this.store.dispatch(SetLoading({ isLoading: true }));
    this.userService.getUsers(e.pageIndex + 1, e.pageSize).subscribe((res) => {
      this.users = res.data;
      this.store.dispatch(SetLoading({ isLoading: false }));
    });
  }
}

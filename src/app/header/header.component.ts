import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { SearchUser } from '../store/user.actions';
import { User } from '../models/user';
import { AppState } from '../app.state';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm = new Subject<Event>();
  user$: Observable<{ filteredUsers: User[] }>;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private router: Router, private store: Store<AppState>) {
    this.user$ = store.pipe(select('user'));
  }

  ngOnInit(): void {
    this.searchTerm
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((event: Event) => {
        this.performSearch(event);
      });
  }

  performSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.trim()) {
      this.store.dispatch(SearchUser({ searchTerm: value }));
      this.trigger.openMenu();
    }
  }

  displayFn(user: User): string {
    return user && user.first_name && user.last_name
      ? user.first_name + ' ' + user.last_name
      : '';
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;

    this.router.navigate(['/users', selectedValue.id]);
  }
}

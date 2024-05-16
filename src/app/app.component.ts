import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'user-dashboard';
  user$: Observable<{ isLoading: boolean }>;

  constructor(private store: Store<AppState>) {
    this.user$ = store.pipe(select('user'));
    this.user$.subscribe((res) => console.log(res));
  }
}

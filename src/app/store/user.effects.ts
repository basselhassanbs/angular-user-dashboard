import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../user/user.service';

import * as userActions from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.SearchUser),
      mergeMap((action) =>
        this.userService.getUser(action.searchTerm).pipe(
          map((data) => userActions.SearchUserSuccess({ user: data.data })),
          catchError((error) => of(userActions.SearchUserError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}

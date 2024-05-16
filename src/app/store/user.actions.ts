import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const SearchUser = createAction(
  '[User] Search User',
  props<{ searchTerm: string }>()
);
export const SearchUserSuccess = createAction(
  '[User] Search User Success',
  props<{ user: User }>()
);
export const SearchUserError = createAction(
  '[User] Search User Error',
  props<{ error: any }>()
);

export const SetLoading = createAction(
  '[User] Set Loading Status',
  props<{ isLoading: boolean }>()
);

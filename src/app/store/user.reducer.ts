import { createReducer, on } from '@ngrx/store';
import {
  SearchUser,
  SearchUserError,
  SearchUserSuccess,
  SetLoading,
} from './user.actions';
import { User } from '../models/user';

export interface UserState {
  filteredUsers: User[];
  users: User[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  filteredUsers: [],
  users: [],
  isLoading: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(SearchUser, (state) => {
    return { ...state, isLoading: true, error: '', filteredUsers: [] };
  }),
  on(SearchUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: '',
      filteredUsers: [action.user],
    };
  }),
  on(SearchUserError, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
      filteredUsers: [],
    };
  }),
  on(SetLoading, (state, action) => {
    return { ...state, isLoading: action.isLoading };
  })
);

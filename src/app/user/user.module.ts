import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { MatCardModule } from '@angular/material/card';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class UserModule {}

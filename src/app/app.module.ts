import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { CacheInterceptor } from './interceptors/cache.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule,
    LoadingBarHttpClientModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

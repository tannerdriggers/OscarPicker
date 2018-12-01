import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OscarComponent } from './oscar/oscar.component'
import { AuthGuard } from './core/auth.guard';
import { OscarAdminComponent } from './oscar-admin/oscar-admin.component';
import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    OscarComponent,
    OscarAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    CanReadGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

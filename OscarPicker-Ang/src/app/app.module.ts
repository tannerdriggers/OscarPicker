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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FireFormDirective } from './fire-form.directive';
import { DropdownDirective } from './dropdown-directive.directive';
import { OrderModule } from 'ngx-order-pipe';
import { OscarStatsComponent } from './oscar-stats/oscar-stats.component';
import { OnCreateDirective } from './on-create.directive';
import { CriticsChoiceAwardsComponent } from './critics-choice-awards/critics-choice-awards.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    OscarComponent,
    OscarAdminComponent,
    NavBarComponent,
    FireFormDirective,
    DropdownDirective,
    OscarStatsComponent,
    OnCreateDirective,
    CriticsChoiceAwardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    CanReadGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

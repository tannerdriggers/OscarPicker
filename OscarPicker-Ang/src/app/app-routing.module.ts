import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OscarComponent } from './oscar/oscar.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';
import { OscarAdminComponent } from './oscar-admin/oscar-admin.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: 'oscars', component: OscarComponent, canActivate: [CanReadGuard] },
  { path: 'oscarAdmin', component: OscarAdminComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
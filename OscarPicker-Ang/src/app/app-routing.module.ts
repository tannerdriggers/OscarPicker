import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OscarComponent } from './oscar/oscar.component';
import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';
import { OscarAdminComponent } from './oscar-admin/oscar-admin.component';
import { OscarStatsComponent } from './oscar-stats/oscar-stats.component';
import { CriticsChoiceAwardsComponent } from './critics-choice-awards/critics-choice-awards.component';
import { WebViewComponent } from './web-view/web-view.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: 'oscar', component: OscarComponent, canActivate: [CanReadGuard] },
  { path: 'oscarStats', component: OscarStatsComponent, canActivate: [CanReadGuard] },
  { path: 'criticsChoice', component: CriticsChoiceAwardsComponent, canActivate: [CanReadGuard] },
  { path: 'oscarAdmin', component: OscarAdminComponent, canActivate: [AdminGuard] },
  { path: 'webview', component: WebViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

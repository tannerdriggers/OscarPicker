import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  title = 'Oscar Picker';

  constructor(public auth: AuthService) { }

}

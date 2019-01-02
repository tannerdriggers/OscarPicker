import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, User } from '../core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-oscar-stats',
  templateUrl: './oscar-stats.component.html',
  styleUrls: ['./oscar-stats.component.scss']
})
export class OscarStatsComponent implements OnInit {

  user: User;
  userAnswers$: Observable<any>;
  oscarCategory$: Observable<any>;
  year: string = '2018';

  constructor(private afs: AngularFirestore, public auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    this.userAnswers$ = this.afs.collection('user-picks/${this.year}/Oscar/B62XPHMbvfeZCGQn5F5uRwMFptu2/categories').valueChanges();
    this.oscarCategory$ = this.afs.collection('oscar_categories/${this.year}/categories').valueChanges();
  }

}

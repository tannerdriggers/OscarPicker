import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService, User } from '../core/auth.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-oscar',
  templateUrl: './oscar.component.html',
  styleUrls: ['./oscar.component.scss']
})
export class OscarComponent implements OnInit {

  oscarCategory$: Observable<any>;

  years$: Observable<any>;
  year: string;

  user: User;

  constructor(private afs: AngularFirestore, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);

    this.years$ = this.afs.collection('oscar_categories').valueChanges();
    this.getYear().then(a => {
      this.oscarCategory$ = this.afs.collection('oscar_categories/' + this.year + '/categories').valueChanges();
      this.oscarCategory$.subscribe(oscars => { console.log(oscars) });
    });
  }

  async getYear(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.years$.subscribe(details => { this.year = details[details.length - 1].year; console.log(details[details.length - 1].year); resolve(details) });
    })
  }

  SubmitForm(): void {
    if (this.VerifyForm()) {

    }
  }

  VerifyForm(): boolean {

    return true;
  }

  YearChosen(year: string): void {
    this.year = year;
    this.oscarCategory$ = this.afs.collection('oscar_categories/' + this.year + '/categories').valueChanges();
  }

}

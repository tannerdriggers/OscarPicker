import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService, User } from '../core/auth.service';

export interface Category {
  name?: string;
  nominees?: string[];
}

@Component({
  selector: 'app-oscar',
  templateUrl: './oscar.component.html',
  styleUrls: ['./oscar.component.scss']
})
export class OscarComponent implements OnInit {

  oscarCategoryRef: AngularFirestoreDocument<any>;
  oscarCategory$: Observable<any>;

  user: User;

  canRead(user: User): boolean {
    if (this.auth.canRead(user)) {
      return true;
    } else {
      console.log('You are not allowed to read this page.');
      return false;
    }
  }

  constructor(private afs: AngularFirestore, public auth: AuthService) {

  }

  ngOnInit() {
    this.oscarCategoryRef = this.afs.doc('oscar_categories/actor in a leading role');
    this.oscarCategory$ = this.oscarCategoryRef.valueChanges();

    this.auth.user$.subscribe(user => this.user = user);
  }

}

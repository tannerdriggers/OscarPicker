import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
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

  oscarCategoryRef: AngularFirestoreCollection<any>;
  oscarCategory$: Observable<any>;
  oscars: any;

  user: User;

  canRead(user: User): boolean {
    if (this.auth.canRead(user)) {
      return true;
    } else {
      console.log('You are not allowed to read this page.');
      return false;
    }
  }

  constructor(private afs: AngularFirestore, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    this.oscarCategoryRef = this.afs.collection('oscar_categories');
    this.oscarCategory$ = this.oscarCategoryRef.valueChanges();
    this.oscarCategory$.forEach(next => {
      this.oscars = next;
      console.log(next);
    })
  }

  selectionClick() {
    
  }

}

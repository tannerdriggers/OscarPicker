import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService, User } from '../core/auth.service';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OscarFormComponent } from '../oscar-form/oscar-form.component';

class Category {
  Winner: string;
  category: string;
  nominees: string[];
  year: string;
}

@Component({
  selector: 'app-oscar',
  templateUrl: './oscar.component.html',
  styleUrls: ['./oscar.component.scss']
})
export class OscarComponent implements OnInit {

  oscarCategory$: Observable<any>;
  years$: Observable<any>;
  year: string = '2018';
  user: User;

  constructor(private afs: AngularFirestore, public auth: AuthService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);

    this.oscarCategory$ = this.afs.collection('oscar_categories/' + this.year + '/categories').valueChanges();
    this.years$ = this.afs.collection('oscar_categories').valueChanges();
    this.oscarCategory$.subscribe(oscars => { console.log(oscars) });
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

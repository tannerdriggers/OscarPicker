import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService, User } from '../core/auth.service';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

export interface Category {
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
  oscars$: Subscription;

  user: User;

  oscarForm: FormGroup;

  canRead(user: User): boolean {
    if (this.auth.canRead(user)) {
      return true;
    } else {
      console.log('You are not allowed to read this page.');
      return false;
    }
  }

  constructor(private afs: AngularFirestore, public auth: AuthService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);

    this.oscarCategory$ = this.afs.collection('oscar_categories').valueChanges();
    this.oscars$ = this.oscarCategory$.subscribe(oscars => { this.oscars$ = oscars; console.log(oscars) });

    this.oscarForm = this.formbuilder.group({
      choices: this.formbuilder.array([''])
    });

    this.AddAllChoices();
  }

  save(model: Category) {
    console.log(model);
  }

  get choices(): FormArray {
    return this.oscarForm.get('choices') as FormArray;
  }
  
  initChoice() {
    return this.formbuilder.group({
      nominee: ['']
    })
  }

  addChoice() {
    const control = <FormArray>this.oscarForm.controls['choices'];
    control.push(this.initChoice());
  }

  AddAllChoices() {
    
  }

  selectionClick() {
    
  }

}

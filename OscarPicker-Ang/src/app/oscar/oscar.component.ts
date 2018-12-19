import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService, User } from '../core/auth.service';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OscarFormComponent } from '../oscar-form/oscar-form.component';

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
  oscars$: Category[];
  nestedForm: FormGroup;
  state: string;

  user: User;

  fruits: Array<String> = ['mango', 'Grapes', 'Strawberry', 'Oranges'];
  selectedFruitValues = [];
  favFruitsError: boolean = true;

  constructor(private afs: AngularFirestore, public auth: AuthService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);

    this.oscarCategory$ = this.afs.collection('oscar_categories').valueChanges();
    this.oscarCategory$.subscribe(oscars => { this.oscars$ = oscars; console.log(oscars) });

    this.nestedForm = this.formbuilder.group({
      favFruits: this.addFruitsControls()
    });
  }

  addFavoritesGroup() {
    return this.formbuilder.group({
      favFruits: this.addFruitsControls()
    });
  }

  addFruitsControls() {
    const arr = this.fruits.map(a => {
      return this.formbuilder.control(false);
    });

    return this.formbuilder.array(arr);
  }

  addFavorites() {
    this.favoritesArray.push(this.addFavoritesGroup());
  }

  get favoritesArray() {
    return <FormArray>this.nestedForm.get('favorites');
  }

  get fruitsArray() {
    return <FormArray>this.nestedForm.get('favFruits');
  }

  checkFruitControlsTouched() {
    let flg = false;
    this.fruitsArray.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });

    return flg;
  }

  getSelectedFruitsValue() {
    this.selectedFruitValues = [];
    this.fruitsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFruitValues.push(this.fruits[i]);
      }
    });

    this.favFruitsError = this.selectedFruitValues.length > 0 ? false : true;
  }

  submitHandler() {
    const newItem = this.selectedFruitValues;
    if (this.nestedForm.valid && this.favFruitsError) {
      console.log({ ...this.nestedForm.value, newItem });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService, User } from '../core/auth.service';
import { OrderPipe } from 'ngx-order-pipe';

class Choice {
  category: string;
  choice?: string;
}

export interface OscarCategory {
  category: string;
  nominees: string[];
  winner?: string;
}

@Component({
  selector: 'app-oscar',
  templateUrl: './oscar.component.html',
  styleUrls: ['./oscar.component.scss']
})
export class OscarComponent implements OnInit {

  oscarCategory$: Observable<OscarCategory[]>;

  years$: Observable<any>;
  year: string;

  user: User;

  choices: Choice[];
  userChoices$: Observable<Choice[]>;
  userChoices: Choice[];

  constructor(private afs: AngularFirestore, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);

    this.choices = new Array<Choice>();
    this.userChoices = new Array<Choice>();

    this.years$ = this.afs.collection('oscar_categories').valueChanges();
    this.getYear().then(a => {
      this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
      this.oscarCategory$.subscribe(cat => { console.log(cat) });

      console.log(this.user.uid);

      this.getUserChoice().then(b => {
        // console.log(this.userChoices$);
        this.userChoices$.subscribe(choices => {
          console.log(choices);
          choices.forEach(choice => {
            this.userChoices.push(choice);
          });
        });
      });
    });
  }

  async getUserChoice(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`);
      this.userChoices$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
      resolve();
    })
  }

  async getYear(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.years$.subscribe(details => {
        this.year = details[details.length - 1].year;
        resolve(details)
      });
    })
  }

  // SubmitForm(): void {
  //   if (this.VerifyForm()) {
  //     console.log('Form Submited');
  //   }
  // }

  SubmitSingleForm(category: string): void {
    for (let choice of this.choices) {
      if (choice.category === category) {
        console.log(`'${category}' Form Submited`)
      }
    }
  }

  VerifyForm(): boolean {
    let flag = true;
    for (let choice of this.choices) {
      if (!choice.choice) {
        flag = false;
      }
    }

    return flag;
  }

  VerifySingleForm(category: string) {
    for (let choice of this.choices) {
      if (choice.category === category) {
        return choice.choice;
      }
    }
    return false;
  }

  YearChosen(year: string): void {
    this.year = year;
    this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
    this.oscarCategory$.subscribe(cat => { console.log(cat) });

    this.userChoices$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
    this.userChoices$.subscribe(choices => {
      console.log(choices);
      choices.forEach(choice => {
        this.userChoices.push(choice);
      });
    });
  }

  newCategory(category: string): void {
    let flag = false;
    for (let choice of this.choices) {
      if (choice.category === category) {
        flag = true;
      }
    }
    if (!flag) {
      let choice = new Choice();
      choice.category = category;
      this.choices.push(choice);
    }
  }

  userChoice(category: string, choice: string): void {
    for (let ch of this.choices) {
      if (ch.category === category) {
        ch.choice = choice;
        console.log(ch);
        this.SubmitSingleForm(category);
      }
    }
  }

  alreadyChosenByUser(category: string, nominee: string): boolean {
    for (let choice of this.userChoices) {
      if (choice.category === category) {
        return choice.choice === nominee;
      }
    }
    return false;
  }

}

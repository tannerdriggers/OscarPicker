import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService, User } from '../core/auth.service';
import { Router, NavigationEnd } from '@angular/router';

interface Year {
  year: string
}

class Choice {
  category: string;
  choice?: string;
}

interface OscarCategory {
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
  oscarCategories: OscarCategory[];

  years$: Observable<Year[]>;
  year: string;

  user: User;

  choices: Choice[];
  userChoices$: Observable<Choice[]>;

  choiceSubscription: Subscription;

  constructor(private afs: AngularFirestore, public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.choices = new Array<Choice>();

    this.auth.user$.subscribe(user => {
      this.user = user
      this.years$ = this.afs.collection<Year>('oscar_categories').valueChanges();
      this.years$.subscribe(details => {
        this.year = details[0].year;
        this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
        this.oscarCategory$.subscribe(categories => {
          this.oscarCategories = categories;
          this.userChoices$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
          this.choiceSubscription = this.userChoices$.subscribe(choices => {
            this.choices = choices;
            this.putEmptyChoices();
          });
        });
      });
    });
  }

  async getUserChoice(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userChoices$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
      resolve();
    })
  }

  async getYear(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.years$.subscribe(details => {
        this.year = details[0].year;
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
        const userAns: AngularFirestoreDocument<Choice> = this.afs.doc(`user_picks/${this.year}/Oscar/${this.user.uid}/categories/${category}`);

        const data: Choice = {
          category: category,
          choice: choice.choice
        }

        userAns.set(data, { merge: true });

        console.log(`'${category}' form submitted`)
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

    this.userChoices$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
  }

  putEmptyChoices(): void {
    let flag = false;
    for (let category of this.oscarCategories) {
      for (let choice of this.choices) {
        if (choice.category === category.category) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        let choice = new Choice();
        choice.category = category.category;
        this.choices.push(choice);
      }
      flag = false;
    }
  }

  userChoice(category: string, choice: string): void {
    // console.log(this.choices);
    for (let ch of this.choices) {
      if (ch.category === category) {
        ch.choice = choice;
        // console.log(ch);
        this.SubmitSingleForm(category);
        break;
      }
    }
  }

  alreadyChosenByUser(category: string, nominee: string): boolean {
    for (let choice of this.choices) {
      if (choice.category === category) {
        return choice.choice === nominee;
      }
    }
    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, User } from '../core/auth.service';
import { Observable, Subscription } from 'rxjs';

interface Year {
  year: string
}

interface Choice {
  category: string,
  choice: string
}

interface OscarCategory {
  category: string;
  nominees: string[];
  winner?: string;
}

@Component({
  selector: 'app-oscar-stats',
  templateUrl: './oscar-stats.component.html',
  styleUrls: ['./oscar-stats.component.scss']
})
export class OscarStatsComponent implements OnInit {

  user: User;

  userAnswers$: Observable<Choice[]>;
  oscarCategory$: Observable<OscarCategory[]>;
  years$: Observable<Year[]>;

  userAnswersSubscription: Subscription;
  oscarCategorySubscription: Subscription;

  userAns: Choice[];
  oscarCategories: OscarCategory[];
  
  year: string = '2018';

  constructor(private afs: AngularFirestore, public auth: AuthService) { }

  ngOnInit() {
    this.years$ = this.afs.collection<Year>('user_picks').valueChanges();
    this.getYear().then(a => {
      this.getUser().then(b => {
        console.log('userId: ' + this.user.uid);
        this.userAnswers$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
        this.userAnswersSubscription = this.userAnswers$.subscribe(answers => {
          this.userAns = answers;
          console.log(this.userAns);
        });
      });
      this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
      this.oscarCategorySubscription = this.oscarCategory$.subscribe(categories => {
        this.oscarCategories = categories;
        console.log(this.oscarCategories);
      })
    });
  }

  rightAnswer(category: string): boolean {
    let userAns;
    let correctAns;
    // if (this.DoneLoading()) {
      for (let ans of this.userAns) {
        if (ans.category === category) {
          userAns = ans.choice;
          break;
        }
      }
      for (let ans of this.oscarCategories) {
        if (ans.category === category) {
          correctAns = ans.winner;
          break;
        }
      }
      if (userAns != null) {
        return userAns === correctAns;
      }
      return null;
    // }
    // return null;
  }

  async getYear(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.years$.subscribe(details => {
        this.year = details[details.length - 1].year;
        resolve();
      });
    })
  }

  async getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.user$.subscribe(
        user => {
          this.user = user;
          resolve();
        }
      );
    })
  }

  YearChosen(year: string): void {
    this.year = year;
    this.userAnswers$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
    this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
  }

  DoneLoading(): boolean {
    // waitsFor(() => !!this.userAns, 'Failed', 50);
    return true;
  }

}

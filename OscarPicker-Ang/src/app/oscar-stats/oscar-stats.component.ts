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
  amountCorrect: number = 0;

  constructor(private afs: AngularFirestore, public auth: AuthService) { }

  ngOnInit() {
    this.years$ = this.afs.collection<Year>('user_picks').valueChanges();
    this.years$.subscribe(details => {
      this.year = details[0].year;
      this.CorrectAnswers();
    });
  }

  CorrectAnswers(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.userAnswers$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
      this.userAnswersSubscription = this.userAnswers$.subscribe(answers => {
        this.userAns = answers;
        this.numberOfCorrectAnswers();
      });
    });
    this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
    this.oscarCategorySubscription = this.oscarCategory$.subscribe(categories => {
      this.oscarCategories = categories;
    });
  }

  numberOfCorrectAnswers(): void {
    for (let category of this.oscarCategories) {
      for (let userAnswer of this.userAns) {
        if (category.category === userAnswer.category) {
          // console.log(category.category + ' :: ' + category.winner + ' : ' + userAnswer.choice);
          if (category.winner === userAnswer.choice) {
            this.amountCorrect++;
          }
        }
      }
    }
  }

  async rightAnswer(category: string) {
    let r;
    // console.log(category);
    await this.rightAnswerPromise(category).then(result => r = result);
    // console.log(category + ':' + r);
    return r;
  }

  async rightAnswerPromise(category: string) {
    return new Promise(resolve => {
      let r: boolean = null;
      this.userAnswersSubscription = this.userAnswers$.subscribe(answers => {
        this.userAns = answers;
        // console.log(this.userAns);
        let userAns;
        let correctAns;
        for (let ans of this.userAns) {
          // console.log(ans.category + ':' + category);
          if (ans.category === category) {
            userAns = ans.choice;
            // console.log(ans.choice);
            break;
          }
        }
        // console.log(this.oscarCategories);
        for (let ans of this.oscarCategories) {
          console.log('Answer Categories= ' + ans.category + ':' + category);
          if (ans.category === category) {
            console.log('Winner= ' + ans.winner);
            correctAns = ans.winner;
            break;
          }
        }
        if (userAns != null) {
          r = userAns === correctAns;
        }
        // console.log('Answers= ' + userAns + ':' + correctAns);
        resolve(r);
      });
    });
  }

  YearChosen(year: string): void {
    this.amountCorrect = 0;
    this.year = year;
    this.CorrectAnswers();
  }

}

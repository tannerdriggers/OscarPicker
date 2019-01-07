import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, User } from '../core/auth.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

interface Year {
  year: string
}

interface Choice {
  category: string,
  choice: string,
  year: string,
  type: string,
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
  userAns: Choice[];
  userAnswersSubscription: Subscription;

  oscarCategory$: Observable<OscarCategory[]>;
  oscarCategories: OscarCategory[];
  oscarCategorySubscription: Subscription;

  years$: Observable<Year[]>;

  year: string = '2018';
  amountCorrect: number = 0;
  globalAverageCorrect: number = 0.00;

  everyonesAnswers$: Observable<Choice[]>;
  everyonesAnswers: Choice[];
  everyonesAnswersSubscription: Subscription;

  constructor(private afs: AngularFirestore, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.years$ = this.afs.collection<Year>('user_picks').valueChanges();
    this.years$.subscribe(details => {
      this.year = details[0].year;
      this.auth.user$.subscribe(user => {
        this.user = user;
        this.CorrectAnswers();
      });
    });
  }

  CorrectAnswers(): void {
    this.userAnswers$ = this.afs.collection<Choice>(`user_picks/${this.year}/${this.user.uid}`).valueChanges();
    this.userAnswersSubscription = this.userAnswers$.subscribe(answer => {
      this.userAns = answer;
      this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
      this.oscarCategorySubscription = this.oscarCategory$.subscribe(categories => {
        this.oscarCategories = categories;
        this.numberOfCorrectAnswers();
        // this.everyonesAnswersSubscription = this.everyonesAnswers$.subscribe(answers => {
        //   this.everyonesAnswers = answers;
        //   console.log(this.everyonesAnswers);
        //   this.averageNumberCorrect();
        // })
      });
    });
  }

  numberOfCorrectAnswers(): void {
    for (let category of this.oscarCategories) {
      for (let ans of this.userAns) {
        if (category.category === ans.category) {
          if (category.winner === ans.choice) {
            this.amountCorrect++;
          }
          break;
        }
      }
    }
  }

  averageNumberCorrect(): void {
    for (let answers of this.everyonesAnswers) {
      
    }
  }

  YearChosen(year: string): void {
    this.amountCorrect = 0;
    this.year = year;
    this.CorrectAnswers();
  }

}

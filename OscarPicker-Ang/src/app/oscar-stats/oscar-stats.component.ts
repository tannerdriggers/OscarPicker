import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, User } from '../core/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

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
    this.userAnswers$ = this.afs.collection<Choice>(`user_picks/${this.year}/Oscar/${this.user.uid}/categories`).valueChanges();
    this.userAnswersSubscription = this.userAnswers$.subscribe(answers => {
      this.userAns = answers;
      this.oscarCategory$ = this.afs.collection<OscarCategory>(`oscar_categories/${this.year}/categories`).valueChanges();
      this.oscarCategorySubscription = this.oscarCategory$.subscribe(categories => {
        this.oscarCategories = categories;
        this.numberOfCorrectAnswers();
      });
    });
  }

  numberOfCorrectAnswers(): void {
    for (let category of this.oscarCategories) {
      for (let userAnswer of this.userAns) {
        if (category.category === userAnswer.category) {
          if (category.winner === userAnswer.choice) {
            this.amountCorrect++;
          }
          break;
        }
      }
    }
  }

  YearChosen(year: string): void {
    this.amountCorrect = 0;
    this.year = year;
    this.CorrectAnswers();
  }

}

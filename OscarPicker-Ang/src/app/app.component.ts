import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Oscar Picker';

  constructor(private router: Router) { }
  
  ngOnInit() {
    let userAgent = window.navigator.userAgent.toLowerCase(),
        snapchat = /snapchat/.test( userAgent ),
        facebook = /fbav/.test( userAgent )

    if (snapchat || facebook) {
      this.router.navigate(['webview']);
    }
  }
}

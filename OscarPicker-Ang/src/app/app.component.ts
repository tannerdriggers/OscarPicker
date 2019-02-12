import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { url } from 'inspector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Oscar Picker';

  constructor(private router: Router, private db: AngularFirestore) { }
  
  ngOnInit() {
    // let browser: boolean = false;

    // let userAgent = window.navigator.userAgent.toLowerCase(),
    //     snapchat = /snapchat/.test( userAgent ),
    //     instagram = /instagram/.test( userAgent ),
    //     facebook = /fbav/.test( userAgent )

    // console.log(snapchat || facebook);
    // if (snapchat || facebook) {
    //   let webView = UIWebview;
    //   this.db.doc('/userAgent/snapface').set({redirected: true, userAgent: window.navigator.userAgent});

    //   let location = "https://oscarpicker-85422.firebaseapp.com";

    //   utilityModule.openUrl(parseInt(platformModule.device.sdkVersion) < url : url.getUrl().toString());

    //   window.open(location, "_blank");
    // }
  }
}

import { Injectable } from '@angular/core';
import { Router, ResolveStart } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles: Roles;
}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.login(provider);
  }

  private login(provider) {
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      }).catch(error => {
        console.log(error);
      });
  }

  private updateUserData(user: firebase.User) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        subscriber: true,
        editor: false,
        admin: false
      }
    }

    return userRef.set(data, { merge: true })

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.homeRedirect();
    });
  }

  //////// Redirections ////////

  homeRedirect() {
    this.router.navigate(['/']);
  }

  adminRedirect() {
    this.router.navigate(['/oscarAdmin']);
  }

  oscarRedirect() {
    this.router.navigate(['/oscar']);
  }

  oscarStatsRedirect() {
    this.router.navigate(['/oscarStats']);
  }

  //////// Abilities and Roles Authorization ////////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}

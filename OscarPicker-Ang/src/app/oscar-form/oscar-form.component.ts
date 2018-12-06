import { Component, OnInit } from '@angular/core';
import { OscarComponent } from '../oscar/oscar.component';

@Component({
  selector: 'app-oscar-form',
  templateUrl: './oscar-form.component.html',
  styleUrls: ['./oscar-form.component.scss']
})
export class OscarFormComponent implements OnInit {

  oscar;

  constructor(private oscars: OscarComponent) { }

  ngOnInit() {
    this.oscar = this.oscars.oscarCategory$;
  }

}

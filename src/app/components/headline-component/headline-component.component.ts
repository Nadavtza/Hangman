import { Component, OnInit } from '@angular/core';

import {headlinePic} from './../../Constants' ;

@Component({
  selector: 'app-headline-component',
  templateUrl: './headline-component.component.html',
  styleUrls: ['./headline-component.component.css']
})
export class HeadlineComponentComponent implements OnInit {

  headlinePic: string ;

  constructor() {

    this.headlinePic = headlinePic ;

   }

  ngOnInit() {
  }

}

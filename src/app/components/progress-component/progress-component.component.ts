import { Component, OnInit } from '@angular/core';

import {progressPics} from './../../Constants' ;
import { GameService } from 'src/app/services/game.service';



@Component({
  selector: 'app-progress-component',
  templateUrl: './progress-component.component.html',
  styleUrls: ['./progress-component.component.css']
})
export class ProgressComponentComponent implements OnInit {

  progressPic: string ;
  progress: number ;
  gameService: GameService ;

  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.progress = 0 ;
    this.progressPic = progressPics[this.progress] ;
  }

  ngOnInit() {
    this.gameService.wrongLetter$.subscribe(
      (value) => {
        this.incrementProgressPic();
    });

    this.gameService.newGame$.subscribe(
      () => {
        this.initProgress();
    });
  }

  initProgress() {
    this.progress = 0 ;
    this.progressPic = progressPics[this.progress] ;
  }

  incrementProgressPic() {
    console.log('incrementProgressPic : ' + this.progress + ' + 1') ;
    this.progress = (this.progress + 1) %  progressPics.length ;

    this.progressPic = progressPics[this.progress] ;

    if (this.progress === progressPics.length - 1) {
      this.gameService.postEndOfGame(false);
    }
  }


}

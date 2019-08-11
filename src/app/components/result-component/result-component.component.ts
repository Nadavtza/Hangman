import { Component, OnInit } from '@angular/core';

import { successPic, failurePic, successResultDescription, failureResultDescription} from './../../Constants' ;
import { GameService } from 'src/app/services/game.service' ;


@Component({
  selector: 'app-result-component',
  templateUrl: './result-component.component.html',
  styleUrls: ['./result-component.component.css']
})
export class ResultComponentComponent implements OnInit {

  isGameEnded: boolean ;
  resultPic: string ;
  resultDescription: string ;
  gameService: GameService ;

  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.isGameEnded = false ;
  }

  ngOnInit() {
    this.gameService.endOfGame$.subscribe(
      (endOfGameResult) => {
        this.setEndOfGameDisplay(endOfGameResult);
    });

    this.gameService.newGame$.subscribe(
      () => {
        this.initResult();
    });
  }

  setEndOfGameDisplay(successResult: boolean) {
    console.log('Setting end of game : '  + successResult ? 'Success' : 'Failure' );

    if (successResult) {
      this.resultPic = successPic ;
      this.resultDescription = successResultDescription ;

    } else {
      this.resultPic = failurePic ;
      this.resultDescription = failureResultDescription ;
    }

    this.isGameEnded = true ;
  }

  initResult() {
    console.log('Initializing Result component');

    this.isGameEnded = false ;
    this.resultPic = successPic ;
    this.resultDescription = successResultDescription ;
  }

  startNewGame() {
    this.gameService.postNewGame() ;
  }

}

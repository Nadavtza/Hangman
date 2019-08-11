import { Component, OnInit } from '@angular/core';

import { GameService } from 'src/app/services/game.service';

interface Letter {
  value: string ;
  isHidden: boolean ;
  color: string ;
}


@Component({
  selector: 'app-board-component',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.css']
})
export class BoardComponentComponent implements OnInit {

  gameService: GameService ;
  sentence: Letter[][] = [] ;
  matchCounter: number ;

  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.sentence = this.gameService.getSentence() ;
    this.matchCounter =  this.gameService.getMatchCounter() ;
  }

  ngOnInit() {
   this.gameService.selectedLetter$.subscribe(
      value => {
        this.addLetterToBoard(value);
    });

   this.gameService.newGame$.subscribe(
      () => {
        this.initBoard();
    });
  }

  initBoard() {
    console.log('Initialzing Board');
    this.sentence = this.gameService.getSentence() ;
    this.matchCounter =  this.gameService.getMatchCounter() ;
  }

  addLetterToBoard(selectedLetter: string) {
    console.log('addLetterToBoard : ' + selectedLetter) ;
    let isLetterFound = false ;

    for (const word of this.sentence) {
      for (const letter of word) {
        if (letter.value === selectedLetter.toLowerCase() || letter.value === selectedLetter.toUpperCase()  ) {
            isLetterFound = true ;
            letter.color = 'blue' ;
            letter.isHidden = false ;
            this.matchCounter -- ;
        }
      }
    }

    if (!isLetterFound) {
      this.gameService.postWrongLetter(selectedLetter) ;
    }

    if ( this.matchCounter === 0 ) {
        this.gameService.postEndOfGame(true);
    }

  }

}

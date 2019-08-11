import { Component, OnInit } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

import { GameService } from 'src/app/services/game.service';


interface Letter {
  value: string;
  isDisabled: boolean;
}

@Component({
  selector: 'app-bank-component',
  templateUrl: './bank-component.component.html',
  styleUrls: ['./bank-component.component.css']
})
export class BankComponentComponent implements OnInit {

  alphabet: string ;
  letters: Letter[] = [] ;
  gameService: GameService ;

  constructor(gameService: GameService) {
    this.gameService = gameService ;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (const letter of this.alphabet) {
      this.letters.push(
        {value: letter, isDisabled: false}
      );
    }

    this.disableDisplayLetters(this.gameService.displayLetters) ;
  }

  ngOnInit() {

    this.gameService.newGame$.subscribe(
      () => {
        this.initBank();
    });

  }

  initBank() {
    console.log('Initalizing Bank') ;

    for (const letter of this.letters) {
        letter.isDisabled = false ;
    }

    this.disableDisplayLetters(this.gameService.displayLetters) ;
  }
  selectLetter(selectedLetter: Letter) {
    if (this.gameService.geEndOfGame()) {
      console.log('Game ended , ignore user selection') ;
      return ;
    }

    console.log('selectedLetter : ' + selectedLetter.value) ;
    selectedLetter.isDisabled = true ;

    // Call to service - update the game
    this.gameService.postSelectedLetter(selectedLetter.value);
  }

  disableDisplayLetters(displayLetters: string) {
    console.log('disableDisplayLetters ' + displayLetters) ;

    if (!displayLetters) {
      return ;
    }

    for (const char of displayLetters) {
      for (const letter of this.letters) {
        if (letter.value === char.toUpperCase()  ) {
            letter.isDisabled = true ;
        }
      }
    }
  }

}

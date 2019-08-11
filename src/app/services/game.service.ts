import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import movies from './../../assets/movies.json';

import { isNullOrUndefined } from 'util';

interface Movie {
    title: string;
    rank: number;
    id: string ;
}

interface Letter {
  value: string;
  isHidden: boolean ;
  color: string ;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // Observable sources
  private wrongLetterSource = new Subject<string>();
  private selectedLetterSource = new Subject<string>();
  private endOfGameSource = new Subject<boolean>();
  private newGameSource = new Subject<void>();

  // Observable streams
  wrongLetter$ = this.wrongLetterSource.asObservable();
  selectedLetter$ = this.selectedLetterSource.asObservable();
  endOfGame$ = this.endOfGameSource.asObservable();
  newGame$ = this.newGameSource.asObservable();


  // Game fields
  movies: Movie[] = [] ;
  endOfGame: boolean  ;
  matchCounter: number ;
  sentence: Letter[][] ;
  displayLetters: string ;

  constructor() {
    this.movies = movies ;
    this.endOfGame = false ;
    this.displayLetters = '' ;
    this.sentence = this.getNewSentence() ;
  }

  /**
   *  Post methods
   */

  // gameResult = true -> success ; gameResult = false -> failure
  public postEndOfGame(gameResult: boolean) {
    console.log('GameService: end of game : success result =' + gameResult );
    this.endOfGame = true ;
    this.endOfGameSource.next(gameResult);
  }

  public postNewGame() {
    this.endOfGame = false ;
    this.displayLetters = '' ;
    this.sentence = this.getNewSentence() ;

    this.newGameSource.next();
  }

  public postWrongLetter(value: string) {
    console.log('User selected a wrong letter ' + value);
    this.wrongLetterSource.next(value);
  }

  public postSelectedLetter(value: string) {
    console.log('User selected : ' + value) ;
    this.selectedLetterSource.next(value);
  }

  public setMatchCounter( counter: number) {
    this.matchCounter = counter ;
  }

  public getMatchCounter() {
    return this.matchCounter ;
  }

  public geEndOfGame() {
    return this.endOfGame ;
  }


  /**
   *  Create a new sentence methods
   */

  public getNewSentence(): Letter[][] {
    const randomMovie = this.getRandomMovie() ;

    const randomMovieFilterLength = randomMovie.replace(/\s+/g, '').length ;

    const sentence: Letter[][] = this.composeSentence(randomMovie);

    this.setMatchCounter( randomMovieFilterLength - this.getPercentRoundDown(25 , randomMovieFilterLength)) ;
    console.log('setMatchCounter : matchCounter value  = ' + this.matchCounter) ;
    return sentence ;
  }


  private composeSentence(movieName: string): Letter[][] {
    console.log ('composeSentence : movie name : ' + movieName) ;

    // Break movie name to words and init the sentence
    const movieNameWords = movieName.split(' ') ;

    // Create a new sentence
    const sentence: Letter[][] = this.initSentence(movieNameWords);

    this.setSentenceLettersToDisplay(sentence , movieName.replace(/\s+/g, '')) ;

    this.printSentence(sentence);

    return sentence ;
  }

  // Select randomly letters to Display
  private setSentenceLettersToDisplay( sentence: Letter[][] , movieName: string) {

    if (isNullOrUndefined(sentence) || sentence.length === 0 || !movieName ) {
        console.log ('setSentenceLettersToDisplay : Missing values') ;
        return ;
    }

    // Find the number of letters to show
    let displayLettersCounter = this.getPercentRoundDown(25 , movieName.length) ;
    console.log ('setSentenceLettersToDisplay : displayLettersCounter ' + displayLettersCounter) ;

    let currMovieName: string = movieName ;
    let display = '' ;

    // Set sentence letters to display
    while (displayLettersCounter > 0 ) {

      // Random a char from the movie name
      const randomMovieIndex: number = Math.floor(Math.random() * currMovieName.length) ;
      const char: string = movieName.charAt(randomMovieIndex);

      // Verify number of char occurrences do not exceed displayLettersCounter
      if ( this.occurrences(movieName, char, false)  > displayLettersCounter) {
        continue ;
      }

      display += char ;

       // Update sentence to show this char
      for (const word of sentence) {
          for (const letter of word) {
            if (letter.value === char) {
              letter.isHidden = false ;
              displayLettersCounter-- ;
            }
          }
      }

        // Remove selected leter from currMovieName
      currMovieName = currMovieName.replace(char , '');
    }

    console.log ('setSentenceLettersToDisplay completed') ;

    // Set Service displayLetters
    this.displayLetters = display ;
  }

  private initSentence(movieNameWrods: string[]): Letter[][] {
    const sentence: Letter[][] = [];

    if (isNullOrUndefined(movieNameWrods) || movieNameWrods.length === 0 ) {
      console.log ('initSentence : Missing movieNameWrods') ;
      return sentence ;
    }

    movieNameWrods.forEach(word => {
      const sentenceWord: Letter[] = [];

      for (const char of word) {
        sentenceWord.push({ value: char, isHidden: true , color: 'black'});
      }

      sentence.push(sentenceWord);

    });

    console.log('initSentence completed');

    return sentence;
  }


  public printSentence(sentence: Letter[][]) {
    if (isNullOrUndefined(sentence) || sentence.length === 0 ) {
       return;
    }

    let sentenceComposed = '' ;

    for (const word of sentence) {
      sentenceComposed.concat(' ') ;

      for (const letter of word) {
        sentenceComposed += letter.value ;
      }
    }

    console.log('printSentence : ' + sentenceComposed);
  }

  // This method selecting a random movie from the movies list
  private getRandomMovie(): string {
    const randomMovieIndex: number = Math.floor(Math.random() * this.movies.length) ;
    const randomMovie: string =  this.movies[randomMovieIndex].title ;
    console.log('Random movie selected : ' + randomMovie);

    return randomMovie;
  }

  /**
   *  GET and SET
   */
  public getSentence(): Letter[][] {
    return this.sentence ;
  }

  public setSentence(sentence: Letter[][]) {
    this.sentence = sentence ;
  }

    // Helpers
  private occurrences(str: string, subString: string, allowOverlapping: boolean ) {

    str += '';
    subString += '';
    if (subString.length <= 0) { return (str.length + 1); }

    let n = 0 ;
    let pos = 0 ;
    const step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = str.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else { break; }
    }
    return n;
  }

  private getPercentRoundDown( percent: number , length: number ): number {
    return Math.floor(percent / 100  * length) ;
  }

}


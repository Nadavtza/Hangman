import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';



import { AppComponent } from './components/app.component';
import { HeadlineComponentComponent } from './components/headline-component/headline-component.component';
import { ResultComponentComponent } from './components/result-component/result-component.component';
import { ProgressComponentComponent } from './components/progress-component/progress-component.component';
import { BoardComponentComponent } from './components/board-component/board-component.component';
import { BankComponentComponent } from './components/bank-component/bank-component.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    HeadlineComponentComponent,
    ResultComponentComponent,
    ProgressComponentComponent,
    BoardComponentComponent,
    BankComponentComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }

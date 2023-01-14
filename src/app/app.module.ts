import { PollService } from './services/poll.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollCreateComponent } from './components/poll/poll-create/poll-create.component';
import { PollComponent } from './components/poll/poll.component';
import { PollVoteComponent } from './components/poll/poll-vote/poll-vote.component';
import { PollResultComponent } from './components/poll/poll-result/poll-result.component';

@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    PollComponent,
    PollVoteComponent,
    PollResultComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [PollService],
  bootstrap: [AppComponent],
})
export class AppModule {}

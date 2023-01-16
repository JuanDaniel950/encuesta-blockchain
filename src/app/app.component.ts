import { pollForm } from 'src/app/types';
import { PollService } from './services/poll.service';
import { Poll, PollVote } from './types';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showForm = false;
  activePoll: any = null;

  polls: Poll[] = [];

  constructor(private pollService: PollService) {
    const pollsito = this.pollService.getPolls();
    console.log('pollsito', pollsito);
  }

  selectPoll(poll: Poll) {
    this.activePoll = null;
    setTimeout(() => {
      this.activePoll = poll;
    }, 100);
  }
  handlePollCreate(poll: pollForm) {
    this.pollService.createPoll(poll);
  }

  handleVote(pollVote: PollVote) {
    console.log(pollVote);
    this.pollService.vote(pollVote.id, pollVote.voted);
  }
}

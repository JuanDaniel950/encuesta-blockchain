import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent implements OnInit {
  @Input() question: string = '';
  @Input() votes: number[] = [];
  @Input() voted: boolean = false;
  @Input() image: string = '';

  numberOfVotes: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.counterVotes();
  }
  counterVotes() {
    this.numberOfVotes = this.votes.reduce((a, b) => a + b, 0);
  }
}

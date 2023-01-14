import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Poll, pollForm } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor() {}

  getPolls(): Observable<Poll[]> {
    return of([
      {
        id: 1,
        question: 'What is your favorite color?',
        results: [90, 11, 22, 55, 31],
        voted: true,
        options: ['Red', 'Blue', 'Green', 'Yellow', 'Orange'],
        thumbnail:
          'https://s1.1zoom.me/big3/471/Painting_Art_Back_view_Photographer_575380_3840x2400.jpg',
      },
      {
        id: 2,
        question: 'What is your favorite Dog?',
        results: [0, 1, 5, 7, 6],
        voted: false,
        options: ['Poodle', 'Labrador', 'Pug', 'Bulldog', 'Beagle'],
        thumbnail:
          'https://www.thesprucepets.com/thmb/ds_6QWZkIa6b0SE_kZaTgk4P8qY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-175928868-120f47906f4849969fcdab28e2e4f494.jpg',
      },
    ]).pipe(delay(2000));
  }

  vote(pollId: string, voteNumber: number) {
    console.log(pollId, voteNumber);
  }

  createPoll(poll: pollForm) {
    console.log(poll);
  }
}

import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PollBlockchainService } from '../blockchain/poll-blockchain.service';
import { Poll, pollForm } from '../types';
import Web3 from 'web3';
@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private web3Service: PollBlockchainService) {}

  web3: Web3 = new Web3();

  async getPolls(): Promise<Poll[]> {
    const totalPolls = await this.web3Service.call('getTotalPoll');
    const polls: Poll[] = [];
    const acc = await this.web3Service.getAccount();
    const voter = await this.web3Service.call('getVoter', acc);

    const voterNormalized = this.normalizeVoter(voter);

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3Service.call('getPoll', i);
      const pollNormalized = this.normalicePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
    }

    return polls;
  }

  vote(pollId: string, voteNumber: number) {
    this.web3Service.executeTransaction('vote', pollId, voteNumber);
  }

  createPoll(poll: pollForm) {
    this.web3Service.executeTransaction(
      'createPoll',
      poll.question,
      poll.thumbnail || '',
      poll.options.map((option) => this.web3.utils.fromAscii(option))
    );
  }
  normalizeVoter(voter: any[]) {
    return {
      id: voter[0],
      votedIds: voter[1].map((vote: any) => vote.toNumber()),
    };
  }
  normalicePoll(poll: any[], voter: any): Poll {
    return {
      id: poll[0].toNumber(),
      question: poll[1],
      thumbnail: poll[2],
      options: poll[4].map((option: any) =>
        this.web3.utils.toAscii(option).replace(/\u0000/g, '')
      ),
      voted: voter.votedIds.includes(poll[0].toNumber()),
      results: poll[3].map((result: any) => result.toNumber()),
    };
  }
}

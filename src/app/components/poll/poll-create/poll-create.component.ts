import { Contract } from 'web3-eth-contract';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PollService } from 'src/app/services/poll.service';
import { Poll, pollForm } from 'src/app/types';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.css'],
})
export class PollCreateComponent {
  pollForm: FormGroup;
  @Output() pollCreated: EventEmitter<pollForm> = new EventEmitter();

  constructor(private fb: FormBuilder, private pollService: PollService) {
    this.pollForm = this.fb.group({
      question: this.fb.control('', [Validators.required]),
      thumbnail: this.fb.control('', [Validators.required]),
      op1: this.fb.control('', [Validators.required]),
      op2: this.fb.control('', [Validators.required]),
      op3: this.fb.control('', [Validators.required]),
    });
  }
  formSubmit() {
    const formData: pollForm = {
      question: this.pollForm.value.question,
      thumbnail: this.pollForm.value.thumbnail,
      options: [
        this.pollForm.value.op1,
        this.pollForm.value.op2,
        this.pollForm.value.op3,
      ],
    };
    this.pollCreated.emit(formData);
  }
}

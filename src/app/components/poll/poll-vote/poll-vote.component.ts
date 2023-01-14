import { PollVote } from 'src/app/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import ApexCharts from 'apexcharts';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css'],
})
export class PollVoteComponent implements AfterViewInit {
  @Input() voted: boolean = false;
  @Input() options: string[] = [];
  @Input() results: number[] = [];
  @Input() question: string = '';
  @Input() id: number = 0;

  @Output() vote: EventEmitter<PollVote> = new EventEmitter();

  pollVote: FormGroup;
  constructor(private fb: FormBuilder, private pollService: PollService) {
    this.pollVote = this.fb.group({
      selected: this.fb.control('', [Validators.required]),
    });
  }
  ngAfterViewInit(): void {
    if (this.voted) this.generateChart();
  }
  submitForm() {
    const pollVote: PollVote = {
      id: this.id.toString(),
      voted: this.pollVote.value.selected,
    };
    console.log(this.pollVote.value);
    this.vote.emit(pollVote);
  }

  generateChart() {
    var options: ApexCharts.ApexOptions = {
      chart: {
        type: 'bar',
      },
      series: [
        {
          name: 'Results',
          data: this.results,
        },
      ],
      xaxis: {
        categories: this.options,
      },
    };
    const chart = new ApexCharts(
      document.getElementById('poll-results'),
      options
    );
    chart.render();
  }
}

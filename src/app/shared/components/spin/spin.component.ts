import { Component, Input, OnInit } from '@angular/core';
import { SpinService } from '@shared/utils/spin.service';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.less']
})
export class SpinComponent implements OnInit {
  isSpin = false;
  @Input()
  size = 45;

  constructor(private spinService: SpinService) {}

  ngOnInit() {
    this.spinService.subscribe(bol => (this.isSpin = bol));
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'default-button',
  standalone: true,
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
  imports: [CommonModule]
})
export class DefaultButtonComponent implements OnInit {

  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor = '#e72929';
  @Input() color = 'white';
  @Input() fontSizeRem = 1.3;
  @Input() widthRem = 12;

  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

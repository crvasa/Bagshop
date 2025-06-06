import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'default-button',
  standalone: true,
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
  imports: [CommonModule]
})
export class DefaultButtonComponent {
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor: string = '#e72929';
  @Input() color: string = 'white';
  @Input() fontSizeRem: number = 1.3;
  @Input() widthRem: number = 12;

  @Output() onClick = new EventEmitter<void>();
}

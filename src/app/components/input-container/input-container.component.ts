import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-container',
  standalone: true,
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css'],
  imports: [CommonModule]
})
export class InputContainerComponent implements OnInit {
  @Input() label!: string;
  @Input() bgColor = 'white';

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NotFoundComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() notFoundMassage: string = "Nothing Found";
  @Input() resetLinkText: string = "Reset";
  @Input() resetLinkRoute: string = "/";

  constructor() {}

  ngOnInit(): void {}
}

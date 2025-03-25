import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{

  @Input() visible: boolean= false;
  @Input() notFoundMassage:string="Nothing Found";
  @Input() resetLinkText: string ="Reset";
  @Input() resetLinkRoute: string = "/";

  constructor(){}

  ngOnInit(): void {
    
  }
}


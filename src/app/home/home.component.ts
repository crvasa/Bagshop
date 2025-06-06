import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { BagService } from '../services/bag/bag.service';
import { Bag } from '../shared/models/bag';

import { TagsComponent } from '../tags/tags.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    TagsComponent,
    NotFoundComponent
  ]
})
export class HomeComponent implements OnInit {
  bags: Bag[] = [];

  constructor(private bagService: BagService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
       let bagsObservable: Observable<Bag[]>;
 
       if (params['searchTerm']) {
          bagsObservable = this.bagService.getAllBagsBySearchTerm(params['searchTerm']);
       } else if (params['tag']) {
          bagsObservable = this.bagService.getAllBagsByTag(params['tag']);
       } else {
          bagsObservable = this.bagService.getAll(); // Default route
       }
 
       bagsObservable.subscribe((serverBags) => {
          console.log('BORSE DAL SERVER:', serverBags);
          this.bags = serverBags;
       });
    });
 }
  ngOnInit(): void {}
}

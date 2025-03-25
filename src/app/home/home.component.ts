import { Component, OnInit } from '@angular/core';
import { BagService } from '../services/bag/bag.service';
import { Bag } from '../shared/models/bag';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  bags: Bag[]=[]
  constructor (private bagService: BagService, private route: 
  ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])  
        this.bags = this.bagService.getAllBagsBySearchTerm(params['searchTerm']); 

      else if(params['tag'])
        this.bags =this.bagService.getAllBagsByTag(params['tag']);

      else
        this.bags = this.bagService.getAll();
    })

  }
}
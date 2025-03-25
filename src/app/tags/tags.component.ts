import { Component, Input, input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { BagService } from '../services/bag/bag.service';

@Component({
  selector: 'app-tags',
  standalone: false,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{

  @Input()
  bagPageTags?:string[];

  @Input()
  justifyContent: string= 'center';
  tags?: Tag[];
  constructor(private bagService: BagService){}


  ngOnInit(): void {
    if(!this.bagPageTags)
      this.tags =this.bagService.getAllTags();
  }
}

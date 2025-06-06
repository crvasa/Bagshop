import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Tag } from '../shared/models/Tag';
import { BagService } from '../services/bag/bag.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() bagPageTags?: string[];
  @Input() justifyContent: string = 'center';

  tags?: Tag[];

  constructor(private bagService: BagService) {
    this.bagService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }

  ngOnInit(): void {}
}

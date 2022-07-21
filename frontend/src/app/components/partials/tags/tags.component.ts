import { FoodService } from './../../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
tags?:Tag[];
  constructor(foodService:FoodService) {
    this.tags=foodService.getAllTags();
   }

  ngOnInit(): void {
  }

}

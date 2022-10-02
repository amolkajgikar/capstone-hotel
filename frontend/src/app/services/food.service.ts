import { FOODS_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_BY_ID_URL } from './../shared/constants/urls';
import { sample_foods, sample_tags } from './../../data';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)

  }
  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_BY_TAG_URL);
  }
  getAllFoodByTag(tag:string):Observable<Food[]>{
    return tag === "All"?
    this.getAll():    
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }
  getFoodById(foodId:string):Observable <Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

}

import { Injectable } from '@angular/core';
import { Bag } from '../../shared/models/bag';
import { Tag } from '../../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { BAGS_BY_ID_URL, BAGS_BY_SEARCH_URL, BAGS_BY_TAG_URL, BAGS_TAGS_URL, BAGS_URL } from '../../shared/constants/urls';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BagService {
  

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bag[]> {
    return this.http.get<Bag[]>(BAGS_URL);
  }

  
  getAllBagsBySearchTerm(searchTerm:string) {
    return this.http.get<Bag[]>(BAGS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(BAGS_TAGS_URL);
  }


  getAllBagsByTag(tag: string): Observable<Bag[]> {
    return tag == "All" ? 
    this.getAll() : 
    this.http.get<Bag[]>(BAGS_BY_TAG_URL + tag);
  }

  getBagById(bagId:number) : Observable<Bag>{
    return this.http.get<Bag>(BAGS_BY_ID_URL + bagId);
  }

}

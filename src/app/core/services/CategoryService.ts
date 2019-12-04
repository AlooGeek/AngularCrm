import { ICategoryService } from '../Iservice/ICategoryService';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';


@Injectable({
    providedIn: 'root'
  })
export class CategoryService implements ICategoryService{
    
    
    constructor(private api : ApiService) {   }
    
    AfficherCategory(): Observable<any> {
        return this.api.get("/category");
    }    
    
    
    AjouterCategory(c: Category): Observable<any> {
        return this.api.post("/category",c);
    }

    ModifierCategory(c: Category): Observable<any> {
        return this.api.put("/category",c);
    }

    SupprimerCategory(IdCategory: any): Observable<any> {
        return this.api.delete("/category/"+IdCategory);
    }


    
}
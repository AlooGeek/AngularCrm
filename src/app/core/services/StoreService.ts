import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IStoreService } from '../Iservice/IStoreService';
import { Store } from '../models/Store';



@Injectable({
    providedIn: 'root'
  })
export class StoreService implements IStoreService{
  
   
   

    constructor(private api : ApiService) {   }
   
    AfficherStore(): Observable<any> {
        return this.api.get("/store");
    } 
    
    AjouterStore(s: Store): Observable<any> {
        return this.api.post("/store",s);
    }

    ModifierStore(s: Store): Observable<any> {
        return this.api.put("/store",s);
    }

    SupprimerStore(IdStore: any): Observable<any> {
        return this.api.delete("/store/"+IdStore);
    }

    getById(IdStore: any): Observable<any> {
        return this.api.get("/store/"+IdStore);
    }



    
}
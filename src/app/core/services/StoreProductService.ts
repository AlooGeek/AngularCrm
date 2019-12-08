
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IStoreProduct } from '../Iservice/IStoreProduct';
import { StoreProduct } from '../models/StoreProduct';


@Injectable({
    providedIn: 'root'
  })
export class StoreProductService implements IStoreProduct{
  

    /**
     *
     */
    constructor(private api : ApiService) {
   

    }
  
  
    AfficherStoreProduct(): Observable<any> {
        return this.api.get("/storeproduct");
    }   
    
    AjouterStoreProduct(IdProduct: any, IdStore: any, s: StoreProduct): Observable<any> {
        return this.api.post("/storeproduct/"+IdStore+"/"+IdProduct,s);
    }

    ModifierStoreProduct(s: StoreProduct): Observable<any> {
        return this.api.put("/storeproduct",s);
    }

    SupprimerStoreProduct(IdStoreProduct: any): Observable<any> {
        return this.api.delete("/storeproduct/"+IdStoreProduct);
    }

    AfficherParCritere(param: any, value: any): Observable<any> {
        return this.api.get("/storeproduct/"+param+"/"+value);
    }







}
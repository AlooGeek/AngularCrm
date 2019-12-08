import { IProductService } from '../Iservice/IProductService';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { product } from '../models/Product';



@Injectable({
    providedIn: 'root'
  })
export class ProductService implements IProductService{
  
listProduct:product[];
listparNombre:product[]=[];

 
    constructor(private api : ApiService) {   }


    AfficherProduit(): Observable<any> {
        return this.api.get("/product");
    }  
    
    
    AjouterProduit(p:product,IdCategory:any): Observable<any> {
        return this.api.post("/product/"+IdCategory,p);
    }


    ModifierProduit(IdCategory:any,p: product): Observable<any> {
        return  this.api.put("/product/"+IdCategory,p);
    }


    SupprimerProduit(IdProduct: any): Observable<any> {
        return this.api.delete("/product/"+IdProduct);
    }

    AfficherParCritere(param: any, value: any): Observable<any> {
        return this.api.get("/product/"+param+"/"+value);
    }


  

    
}
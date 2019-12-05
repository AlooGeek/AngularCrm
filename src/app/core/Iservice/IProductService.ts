import { Observable } from 'rxjs';
import { product } from '../models/Product';

export interface IProductService{

    AfficherProduit() : Observable<any>;
    AjouterProduit(p:product,IdCategory:any) : Observable<any>;
    ModifierProduit(IdCategory:any,p:product) : Observable<any>;
    SupprimerProduit(IdProduct :any) :Observable<any>;
    AfficherParCritere(param:any,value:any):Observable<any>;
  



}
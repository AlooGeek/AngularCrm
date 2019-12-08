import { Observable } from 'rxjs';
import { StoreProduct } from '../models/StoreProduct';

export interface IStoreProduct{


    AfficherStoreProduct() : Observable<any>;
    AjouterStoreProduct(IdProduct:any,IdStore:any,s:StoreProduct) : Observable<any>;
    ModifierStoreProduct(s:StoreProduct) : Observable<any>;
    SupprimerStoreProduct(IdStoreProduct :any) :Observable<any>;
    AfficherParCritere(param:any,value:any):Observable<any>;
}
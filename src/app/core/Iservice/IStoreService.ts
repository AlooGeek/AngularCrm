import { Observable } from 'rxjs';
import { Store } from '../models/Store';


export interface IStoreService{

    AfficherStore() : Observable<any>;
    AjouterStore(s:Store) : Observable<any>;
    ModifierStore(s:Store) : Observable<any>;
    SupprimerStore(IdStore :any) :Observable<any>;
    getById(IdStore:any) :Observable<any>;



}
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

export interface ICategoryService{

    AfficherCategory() : Observable<any>;
    AjouterCategory(c:Category) : Observable<any>;
    ModifierCategory(c:Category) : Observable<any>;
    SupprimerCategory(IdCategory :any) :Observable<any>;
}
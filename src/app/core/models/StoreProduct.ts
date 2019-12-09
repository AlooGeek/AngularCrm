import { product } from './Product';
import { Store } from './Store';

export class StoreProduct{
    
    public id  : number;
	public qte :number;
	public dateEntry: any ;
	public disponible :number;

	public products:product;
	public stores:Store;
	
}
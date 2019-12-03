import { Pack } from './Pack';
import { product } from './Product';

export class Pack_Product{
     id:number;
	period:number;
	prix:number;

	pack:Pack;
	product:product;
}
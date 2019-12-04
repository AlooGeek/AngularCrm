import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/ProductService';
import { product } from 'src/app/core/models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listProducts :product[];
  listlength:product[];
  listparNombre: product[]=[];

  constructor(private servprod:ProductService) { }

  ngOnInit() {
    this.getAllProduct();
  }


  getAllProduct(){

   
     return this.listProducts=this.AfficherNbrPro(10);

  }


  AfficherNbrPro(nbr:any){
   
    var i=0;
   
    this.servprod.AfficherProduit().subscribe(res=>{

      this.listlength=res;
      if (this.listlength.length<nbr){
        for (i;i<this.listlength.length;i++){
        
        this.listparNombre.push(res[i]);
        }
      }else{

      
    for (i;i<nbr;i++){
      
      this.listparNombre.push(res[i]);
       
       }
      }

    })


  this.listparNombre=[];
  return this.listparNombre;
}

}

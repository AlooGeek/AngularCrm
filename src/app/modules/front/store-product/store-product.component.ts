import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/CategoryService';
import { Category } from 'src/app/core/models/Category';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { product } from 'src/app/core/models/Product';
import { ProductService } from 'src/app/core/services/ProductService';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css','../home/home.component.css']
})
export class StoreProductComponent implements OnInit {

  
  listCategory:Category[];
  listProduct:product[];

  
  
  
  constructor(private servcat:CategoryService,private servprod:ProductService) { }

  ngOnInit() {
    this.getAllCategory();
    this.getAllProduct();
  }


  CategForm = new FormGroup({
    'name':new FormControl(''),
    });

  

  getAllCategory(){
    this.servcat.AfficherCategory().subscribe(res=>this.listCategory=res);
  }

  getAllProduct(){
    this.servprod.AfficherProduit().subscribe(res=>this.listProduct=res);
  }



  AfficheProduitPCATEG(){
    
    if (this.CategForm.controls.name.value=="all"){
      this.servprod.AfficherProduit().subscribe(res=>this.listProduct=res);

    }else{
      this.servprod.AfficherParCritere("category_id_category",this.CategForm.controls.name.value).subscribe(res=>this.listProduct=res);
    }

    
    
  }
}

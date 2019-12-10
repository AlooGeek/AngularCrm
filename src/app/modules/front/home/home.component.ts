import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Discount } from 'src/app/core/models/Discount';
import { ApiService } from 'src/app/core/services/api.service';
import { Pack_Product } from 'src/app/core/models/Pack_Product';
import { product } from 'src/app/core/models/Product';
import { Pack } from 'src/app/core/models/Pack';
import { FindPackProduct } from 'src/app/core/models/FindPackProduct';
import { forEach } from '@angular/router/src/utils/collection';
import { ProductService } from 'src/app/core/services/ProductService';
import { StoreProduct } from 'src/app/core/models/StoreProduct';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //src/assets/images/discount/${n}
  images = [1,2,3,4].map((n) => `http://localhost:4200/assets/images/discount/${n}.jpg`);
  

  //localstorage
  constructor(private api: ApiService,config: NgbCarouselConfig,private servprod:ProductService) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
   
  }

  listdiscount:Discount[];
  listpackproduct:Pack_Product[]=[];
  listgrouped:Pack_Product[];
  listProducts:product[];
  listprice:any[];
  listlength:product[];
  listparNombre: product[]=[];

  FindPackProduct:FindPackProduct[]=[];
  fpp:FindPackProduct;

  listpackachat:StoreProduct[]=[];

  //localstragepack

  ngOnInit() {
   this.api.get("/discount").subscribe(res=>this.listdiscount=res);
   this.api.get("/packproducts").subscribe(res=>this.listpackproduct=res);
   this.api.get("/packproducts/liste").subscribe(res=>this.listgrouped=res);
   this.api.get("/packproducts/packprice").subscribe(res=>this.listprice=res);
   this.getAllProduct();
  }



  GetSamePack(){
    this.FindPackProduct.splice(0,this.FindPackProduct.length);
    this.fpp=new FindPackProduct();
    this.fpp.id=this.listpackproduct[0].packs.id;
    this.fpp.listString.push(this.listpackproduct[0].productss.label);
    this.FindPackProduct.push(this.fpp);
    var b=false;

    for (var i=1;i<this.listpackproduct.length;i++){
      for (var j=0;j<this.FindPackProduct.length;j++){

        if(this.listpackproduct[i].packs.id == this.FindPackProduct[j].id){
          this.FindPackProduct[j].listString.push(this.listpackproduct[i].productss.label);
          b=true;
        }
      }

      if(b==false){
        this.fpp=new FindPackProduct();
        this.fpp.id=this.listpackproduct[i].packs.id;
        this.fpp.listString.push(this.listpackproduct[i].productss.label);
        this.FindPackProduct.push(this.fpp);
      
    }
    b=false;

}
    //console.log(this.FindPackProduct);
    return this.FindPackProduct;
    
  }


  //************************** PRODUCTS **********************************


getAllProduct(){

   
     return this.listProducts=this.AfficherNbrPro(8);

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



ajouterPanierPack(p){

  this.listpackachat.push(p);
  localStorage.setItem("packpanier",JSON.stringify(this.listpackachat));
  localStorage.getItem("packpanier");
  console.log(this.listpackachat);

// alert(this.listpackachat);


}





  //************************** END PRODUCTS *******************************



}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pack } from 'src/app/core/models/Pack';
import { ApiService } from 'src/app/core/services/api.service';
import { Pack_Product } from 'src/app/core/models/Pack_Product';
import { product } from 'src/app/core/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {


  packForm = new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'StartDate':new FormControl('',[Validators.required]),
    'EndDate':new FormControl('',[Validators.required]),
    'ReductionAmount':new FormControl('',[Validators.required]),
    'Description':new FormControl('',[Validators.required])

    });

    packproductForm=new FormGroup({
      'pack':new FormControl('',[Validators.required]),
      'product':new FormControl('',[Validators.required])
    })
    
    get packf(){
      return this.packForm.controls;
      
    }
  listpack: Pack[];
  listproduct:product[];
  listpackproduct:Pack_Product[];
  listprice:Pack_Product[];
  pack:Pack;
  packproduct:Pack_Product;
  

  constructor(
    private api : ApiService,
    private router:Router
    ) { }

  ngOnInit() {
    this.getAllpack();
    this.getAllProduct();
    this.getAllPackProduct();
    this.getPriceOfPack();
  }


  getAllpack(){
    this.api.get("/pack").subscribe(res=>this.listpack=res);
  }

  getAllProduct(){
    this.api.get("/product").subscribe(res=>this.listproduct=res);
  }

  getAllPackProduct(){
    this.api.get("/packproducts").subscribe(res=>this.listpackproduct=res);
  }

  AddPackProduct(){
    this.packproduct=new Pack_Product();
    this.packproduct.pack=this.packproductForm.controls.pack.value;
    this.packproduct.product=this.packproductForm.controls.product.value;
    this.api.post("/packproducts/"+this.packproductForm.controls.pack.value+"/"+this.packproductForm.controls.product.value,this.pack).subscribe(data=>{
      alert("Pack Added");
    });
    window.location.reload();
  }

  getPriceOfPack(){
    this.api.get("/packproducts/packprice").subscribe(res=>this.listprice=res);
  }
  
  AddPack(){
    this.pack = new Pack();
    this.pack.PackName =this.packForm.controls.name.value;
    this.pack.PackStartDate=this.packForm.controls.StartDate.value;
    this.pack.PackEndDate=this.packForm.controls.EndDate.value;
    this.pack.reduction_amount=this.packForm.controls.ReductionAmount.value;
    this.pack.PackDescription=this.packForm.controls.Description.value;
    this.api.post("/pack",this.pack).subscribe(data=>{
      alert("Pack Added");
    });
    window.location.reload();
  }

  Deletepack(id){
    this.api.delete("/pack/"+id).subscribe();
   window.location.reload();
  }

  DeletePackProduct(id){
    this.api.delete("/pack/"+id).subscribe();
    window.location.reload();
  }
}

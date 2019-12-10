import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pack } from 'src/app/core/models/Pack';
import { ApiService } from 'src/app/core/services/api.service';
import { Pack_Product } from 'src/app/core/models/Pack_Product';
import { product } from 'src/app/core/models/Product';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
    'ReductionAmount':new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
    'Description':new FormControl('',[Validators.required])

    });

    packproductForm=new FormGroup({
      'pack':new FormControl('',[Validators.required]),
      'product':new FormControl('',[Validators.required])
    })
    
    get packf(){
      return this.packForm.controls;
      
    }

    PackFormUpdate = new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'StartDate':new FormControl('',[Validators.required]),
      'EndDate':new FormControl('',[Validators.required]),
      'ReductionAmount':new FormControl('',[Validators.required]),
      'Description':new FormControl('',[Validators.required])
  
      });
    
      get packfupdate(){
        return this.PackFormUpdate.controls;
        
      }

  listpack: Pack[];
  listproduct:product[];
  listpackproduct:Pack_Product[];
  listprice:Pack_Product[];
  pack:Pack;
  packproduct:Pack_Product;
  selectedPack:Pack;
  closeResult: string;


  constructor(
    private api : ApiService,
    private router:Router,
    private modalService: NgbModal
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
    this.packproduct.packs=this.packproductForm.controls.pack.value;
    this.packproduct.productss=this.packproductForm.controls.product.value;
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
    this.api.delete("/packproducts/"+id).subscribe();
    window.location.reload();
  }

  open(content,i) {
    this.selectedPack=this.listpack[i];
    console.log(this.selectedPack);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  updatePack(id){
    this.pack=this.selectedPack;
    this.pack.id=this.selectedPack.id;

    if(this.PackFormUpdate.controls.name.value==""){
      this.pack.id=this.selectedPack.id;
    }
    else{
      this.pack.PackName =this.PackFormUpdate.controls.name.value;

    }

    if(this.PackFormUpdate.controls.StartDate.value==""){
      this.pack.PackStartDate=this.selectedPack.PackStartDate;
    }
    else{
      this.pack.PackStartDate=this.PackFormUpdate.controls.StartDate.value;

    }

    if(this.PackFormUpdate.controls.EndDate.value==""){
      this.pack.PackEndDate=this.selectedPack.PackEndDate;
    }
    else{
      this.pack.PackEndDate=this.PackFormUpdate.controls.EndDate.value;

    }

    
    if(this.PackFormUpdate.controls.ReductionAmount.value==""){
      this.pack.reduction_amount=this.selectedPack.reduction_amount;
    }
    else{
      this.pack.reduction_amount=this.PackFormUpdate.controls.ReductionAmount.value;
    }
    if(this.PackFormUpdate.controls.Description.value==""){
      this.pack.PackDescription=this.selectedPack.PackDescription;
    }
    else{
      this.pack.PackDescription=this.PackFormUpdate.controls.Description.value;
    }
    this.api.put("/pack/"+id,this.pack).subscribe(res=>this.listpack=res);

  }
}

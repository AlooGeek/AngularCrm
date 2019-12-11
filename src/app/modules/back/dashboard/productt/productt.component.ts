import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { product } from 'src/app/core/models/Product';
import { Category } from 'src/app/core/models/Category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/core/services/ProductService';
import { CategoryService } from 'src/app/core/services/CategoryService';


@Component({
  selector: 'app-productt',
  templateUrl: './productt.component.html',
  styleUrls: ['../dashboard.component.css','productt.component.css']
})
export class ProducttComponent implements OnInit {


  listProduct: product[]=[];
  listCategory: Category[]=[];
  idcat:number;
  p:product;
  prodUpdate:product;
  selectedFile: File =null;
  qtedisp=false;
  changeTVA=true;
  closeResult: string;


 



  ProductForm = new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'img':new FormControl('',[Validators.required]),
    'dispo':new FormControl(''),
    'price':new FormControl('',[Validators.required]),
    'qte':new FormControl(''),
    'tva':new FormControl(''),
    'categ':new FormControl('',[Validators.required]),
  
    });

    get pform(){
      return this.ProductForm.controls;
    }
 
 


  constructor(private servprod:ProductService,private servCategory:CategoryService,private modalService: NgbModal) { }

  ngOnInit() {

    this.getAllProduct();
    this.getAllCategory();
  
  }


  getAllProduct(){

    return this.servprod.AfficherProduit().subscribe(res=> {
      this.listProduct=res;
      this.collectionSize= this.listProduct.length;
    });

  }



     /************ PAGINATION  */
     page = 1;
     pageSize = 25;
     collectionSize = 0;
   
     get products(): product[] {
       
       return this.listProduct
         .map((product, i) => ({id: i + 1, ...product}))
         .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
     }
   /*************************** **************/

  getAllCategory(){
    this.servCategory.AfficherCategory().subscribe(res=> this.listCategory=res);
  }

  addProduct(){
    this.p = new product;
    this.p.label =this.ProductForm.controls.name.value;
    this.p.unitPrice=this.ProductForm.controls.price.value;
    this.p.imageUrl=this.selectedFile.name;
    this.p.qte=this.ProductForm.controls.qte.value;
    if (this.ProductForm.controls.tva.value==""){
      this.p.tva=18;
    }else{
      this.p.tva=this.ProductForm.controls.tva.value;
    }
    if (this.ProductForm.controls.dispo.value==""){
      this.p.disponible=1;
    }else{
      this.p.disponible=this.ProductForm.controls.dispo.value;
    }
  
    this.idcat=this.ProductForm.controls.categ.value;

    
    this.ProductForm.reset();

    this.servprod.AjouterProduit(this.p,this.idcat).subscribe(res=> this.listProduct=res);
  
  
  }

  
  rslt:any="";

  delete(idpro){
    
    if (window.confirm('Are you sure, you want to delete?')){
    
    this.servprod.SupprimerProduit(idpro).subscribe(res=>{ 
   
      this.listProduct=res;
      this.rslt=res;
 
      if(this.rslt.statusres!=undefined){
      alert(this.rslt.statusres);
      }
    
    });
    

    }

  }

  onFileChanged(event) {
    this.selectedFile= <File>event.target.files[0];
  }



  onNondispoChanged(){
    this.qtedisp=true;
  }

  ondispoChanged(){
    this.qtedisp=false;
  }

  changerTva(){
    this.changeTVA=false;
  }


  
  open(content,prod) {

    this.prodUpdate=prod;
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



  ProductUpdateForm = new FormGroup({
    'label':new FormControl('',[Validators.required]),
    'price':new FormControl('',[Validators.required]),
    'qte':new FormControl('',[Validators.required]),
    'tva':new FormControl('',[Validators.required]),
    'categ':new FormControl('',[Validators.required])
  
    });

    
    get pUpdateform(){
      return this.ProductUpdateForm.controls;
    }

    imagebool=true;
    changer=false;
    prod: product;
    category=0;


  showImage(){
    this.imagebool=false;
    this.changer=true;
  }

  updateProduct(){

   this.prod = new product();

   this.prod.id=this.prodUpdate.id;

   this.prod.newprice=this.prodUpdate.newprice;

   if (this.ProductUpdateForm.controls.categ.value!=""){
    this.category=this.ProductUpdateForm.controls.categ.value;
  }else{
    this.category=this.prodUpdate.category.id;
  }
 
    //IMAGEURL
    if (this.selectedFile==null){
      this.prod.imageUrl=this.prodUpdate.imageUrl;
    }else{
      this.prod.imageUrl=this.selectedFile.name;
    }
    //label
    if (this.ProductUpdateForm.controls.label.value==""){
      this.prod.label =this.prodUpdate.label;
    }else {
      this.prod.label =this.ProductUpdateForm.controls.label.value;
    }

    //unitPrice
    if (this.ProductUpdateForm.controls.price.value==""){
      this.prod.unitPrice =this.prodUpdate.unitPrice;
    }else {
      this.prod.unitPrice=this.ProductUpdateForm.controls.price.value
    }

    //qte
     if (this.ProductUpdateForm.controls.qte.value=="" && this.ProductUpdateForm.controls.qte.value!="0"){
      this.prod.qte =this.prodUpdate.qte;
    }else {
      this.prod.qte=this.ProductUpdateForm.controls.qte.value;
    }

    

       //TVA
       if (this.ProductUpdateForm.controls.tva.value==""){
        this.prod.tva =this.prodUpdate.tva;
      }else {
        this.prod.tva=this.ProductUpdateForm.controls.tva.value;
      }

      this.prod.id=this.prodUpdate.id;
  
    if (window.confirm('Are you sure, you want to update?'))  {

      this.modalService.dismissAll();
    this.servprod.ModifierProduit(this.category,this.prod).subscribe(res=> this.listProduct=res);
    
    
    this.imagebool=true;
    this.changer=false;
    }


  }

 

  
 



}

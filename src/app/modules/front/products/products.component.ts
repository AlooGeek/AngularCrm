import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/ProductService';
import { StoreProductService } from 'src/app/core/services/StoreProductService';
import { StoreProduct } from 'src/app/core/models/StoreProduct';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/core/services/CategoryService';
import { FormGroup, FormControl } from '@angular/forms';
import { product } from 'src/app/core/models/Product';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from 'src/app/core/services/StoreService';
import { Store } from 'src/app/core/models/Store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private activatedroute : ActivatedRoute,private servstore:StoreService,private modalService: NgbModal,private servcat:CategoryService,private servprod:ProductService,private servsp:StoreProductService) { }

  ids:any;
  listStoreProduct:StoreProduct[];
  listCategory:Category[];
  listStores: Store[];
  
  closeResult: string;


  ngOnInit() {
    this.activatedroute.paramMap.subscribe (result => this.ids=result.get('ids'));
    this.getStoreProductsById();
    this.getAllCategory();
    this.getAllStores();
  }

  CategForm = new FormGroup({
    'name':new FormControl(''),
    });

  

  getAllCategory(){
    this.servcat.AfficherCategory().subscribe(res=>this.listCategory=res);
  }
  getAllStores(){
    this.servstore.getById(this.ids).subscribe(res=>this.listStores=res);
  }

  

  getStoreProductsById(){



    this.servsp.AfficherStoreGROUPBYProduct(this.ids).subscribe(res=>this.listStoreProduct=res);
  }










  listPanier : StoreProduct[]=[];


  ajouterPanier(p){

    this.listPanier.push(p);
    localStorage.setItem("panier", JSON.stringify(this.listPanier));
    alert(localStorage.getItem("panier"));


  }

  open(content) {

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

}




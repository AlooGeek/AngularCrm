import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/core/services/CategoryService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../dashboard.component.css','./category.component.css']
})
export class CategoryComponent implements OnInit {


  listCategory :Category[];
  category:Category =null;
  closeResult: string;
  categoryUpdate:Category;

  constructor(private servCategory: CategoryService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllCategory();
  }


  
  CategoryForm = new FormGroup({
    'name':new FormControl('',[Validators.required]), 
    });

    get pform(){
      return this.CategoryForm.controls;
    }


  getAllCategory(){
    return this.servCategory.AfficherCategory().subscribe(res=>this.listCategory=res);
  }


  addCategory(){

    this.category = new Category();
    
    this.category.name=this.CategoryForm.controls.name.value;

    this.CategoryForm.reset();

    this.servCategory.AjouterCategory(this.category).subscribe(res=>this.listCategory=res);



  }

  rslt:any="";
  delete(id){
    if (window.confirm('Are you sure, you want to delete?')){
    this.servCategory.SupprimerCategory(id).subscribe(res=>{
      
      this.listCategory=res;
      this.rslt=res;
 
      if(this.rslt.statusres!=undefined){
      alert(this.rslt.statusres);
      }
    
    
    });

    }

  }

  open(content,categ) {

    this.categoryUpdate=categ;
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

  CategoryUpdateForm = new FormGroup({
    'name':new FormControl('',[Validators.required]), 
    });

    
    
    
    get pUpdateform(){
      return this.CategoryUpdateForm.controls;
    }

    categ:Category;
   
   
    updateCategory(){

      this.categ = new Category();

      if (this.CategoryUpdateForm.controls.name.value==""){
        this.categ.name =this.categoryUpdate.name;
      }else {
        this.categ.name =this.CategoryUpdateForm.controls.name.value;
      }

      this.categ.id=this.categoryUpdate.id;

      this.modalService.dismissAll();
      this.servCategory.ModifierCategory(this.categ).subscribe(res=>this.listCategory=res);


    }

}

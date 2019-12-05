import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/StoreService';
import { Store } from 'src/app/core/models/Store';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css','../dashboard.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private servStore:StoreService,private modalService: NgbModal) { }

  listStores:Store[];
  store:Store;
  storeUpdate:Store;
  closeResult: string;

  ngOnInit() {
    this.getAllStores();
  }

  getAllStores(){
    this.servStore.AfficherStore().subscribe(res=>this.listStores=res);
  }


  StoreForm = new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'ville':new FormControl('',[Validators.required]),
    'address':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]),
    'phnbr':new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
  
  
    });

    get sform(){
      return this.StoreForm.controls;
    }

    addStore(){
      this.store=new Store();
      
      this.store.name=this.StoreForm.controls.name.value;
      this.store.ville=this.StoreForm.controls.ville.value;
      this.store.address=this.StoreForm.controls.address.value;
      this.store.email=this.StoreForm.controls.email.value;
      this.store.phoneNumber=this.StoreForm.controls.phnbr.value;

      this.servStore.AjouterStore(this.store).subscribe(res=>this.listStores=res);


    }


    delete(id){
        this.servStore.SupprimerStore(id).subscribe(res=>this.listStores=res);
    }



    open(content,s) {

      this.storeUpdate=s;
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


    
    StoreUpdateForm = new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'ville':new FormControl('',[Validators.required]),
    'address':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]),
    'phnbr':new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
  
  
    });

    get suform(){
      return this.StoreUpdateForm.controls;
    }

    updateStore(){

      //name
      if (this.StoreUpdateForm.controls.name.value!=""){
          this.storeUpdate.name=this.StoreUpdateForm.controls.name.value;
      }
      //ville
      if (this.StoreUpdateForm.controls.ville.value!=""){
        this.storeUpdate.ville=this.StoreUpdateForm.controls.ville.value;
    }
    //address
    if (this.StoreUpdateForm.controls.address.value!=""){
      this.storeUpdate.address=this.StoreUpdateForm.controls.address.value;
  }
    //email
    if (this.StoreUpdateForm.controls.email.value!=""){
      this.storeUpdate.email=this.StoreUpdateForm.controls.email.value;
  }
    //phonenumber
    if (this.StoreUpdateForm.controls.phnbr.value!=""){
      this.storeUpdate.phoneNumber=this.StoreUpdateForm.controls.phnbr.value;
  }

  this.modalService.dismissAll();
  this.servStore.ModifierStore(this.storeUpdate).subscribe(res=>this.listStores=res);



    }

  //Google MAP API
  
  texto : string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;

}

import { Component, OnInit, NgZone, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { StoreService } from 'src/app/core/services/StoreService';
import { Store } from 'src/app/core/models/Store';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapsAPILoader, MouseEvent  } from '@agm/core';
import { ProductService } from 'src/app/core/services/ProductService';
import { product } from 'src/app/core/models/Product';
import { StoreProductService } from 'src/app/core/services/StoreProductService';
import { StoreProduct } from 'src/app/core/models/StoreProduct';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css','../dashboard.component.css']
})
export class StoreComponent implements OnInit  {

  constructor(private servStore:StoreService,private modalService: NgbModal,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private servprod:ProductService,private servsp:StoreProductService) { }

  listStores:Store[];
  store:Store;
  storeUpdate:Store;
  closeResult: string;

  ngOnInit() {
    this.getAllStores();
    this.getAllProducts();

    console.log(this.listStores);
    
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 30;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
    
  }

  getAllProducts(){
    this.servprod.AfficherProduit().subscribe(res=>this.listproducts=res);
  }

  getAllStores(){
    this.servStore.AfficherStore().subscribe(res=>this.listStores=res);
  }

// ******************************* ADD STORE ************************
  StoreForm = new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'ville':new FormControl('',[Validators.required]),
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
      this.store.address=this.address;
      this.store.email=this.StoreForm.controls.email.value;
      this.store.phoneNumber=this.StoreForm.controls.phnbr.value;
      this.store.latitude=this.latitude;
      this.store.longitude=this.longitude;


      this.StoreForm.reset();
      this.servStore.AjouterStore(this.store).subscribe(res=>this.listStores=res);



    }

  // ******************************** END ADD STORE ******************************  

 //********************** DELETE STORE *****************
    delete(id){
        this.servStore.SupprimerStore(id).subscribe(res=>this.listStores=res);
    }
   // ************************* END DELETE STORE *************** 


    //*************** UPDATE STORE ****************************

    open(content,s) {

      this.storeUpdate=s;
      this.latitude=this.storeUpdate.latitude;
      this.longitude=this.storeUpdate.longitude;
      this.address=this.storeUpdate.address;

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
 
    //email
    if (this.StoreUpdateForm.controls.email.value!=""){
      this.storeUpdate.email=this.StoreUpdateForm.controls.email.value;
  }
    //phonenumber
    if (this.StoreUpdateForm.controls.phnbr.value!=""){
      this.storeUpdate.phoneNumber=this.StoreUpdateForm.controls.phnbr.value;
  }

  this.storeUpdate.latitude=this.latitude;
  this.storeUpdate.longitude=this.longitude;
  this.storeUpdate.address=this.address;
  this.modalService.dismissAll();
  this.servStore.ModifierStore(this.storeUpdate).subscribe(res=>this.listStores=res);
  this.setCurrentLocation();



    }

  // *********************  END UPDATE STORE *********************** 

  // ********************************Google MAP API ****************************************
  
  texto : String = 'Tunis';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 30;
  title: string = 'Tunis';
  latitude: number;
  longitude: number;
  address: String="Tunis";
  private geoCoder;
  locstore:Store;



  open1(content1,s) {

    this.locstore=s;

    this.texto=this.locstore.ville+"  "+this.locstore.address;
    this.lat=this.locstore.latitude;
    this.lng=this.locstore.longitude;

    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
    });
    
  }

  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


//Position Actuelle
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
  @ViewChild('search')
  public searchElementRef: ElementRef;
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
 //  ****************************** END GOOGLE MAP API ***************************


// *************************** AFFECT PRODUCTS TO STORE ****************************


storeafect:Store;
listproducts:product[];
showstoreprod=true;
prod:product=null;
storeprod:StoreProduct;
listStoreProduct:StoreProduct[];

open2(content2,s) {

  this.storeafect=s;
  this.servsp.AfficherParCritere("STORE_ID",""+this.storeafect.id).subscribe(res=>this.listStoreProduct=res);

  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason2(reason)}`;
  });

  
}

private getDismissReason2(reason: any): string {

  this.showstoreprod=true;
  this.storeProductForm.reset();
  this.noview=false;
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }

  
  
}



maxqte=5;


affect(prod){
this.prod=prod;
this.showstoreprod=false;
this.noview=true;
this.showitafter=true;
this.getAllProducts();
this.maxqte=this.prod.qte;

}

trah(){
  alert("hello");
}





storeProductForm = new FormGroup({
  'qte':new FormControl('',[Validators.required]),
  'date':new FormControl('',[Validators.required]),
  });

  get sp(){
    return this.storeProductForm.controls;
  }


msg:string;
qteError=true;

addstoreProduct(){

  if (this.storeProductForm.controls.qte.value<=this.prod.qte){

  
  this.storeprod=new StoreProduct();
  this.storeprod.qte=this.storeProductForm.controls.qte.value;
  this.storeprod.dateEntry=this.storeProductForm.controls.date.value;

  this.showstoreprod=true;
  this.storeProductForm.reset();

  

  this.msg="Product Affected to "+this.storeafect.name;

  
  this.servsp.AjouterStoreProduct(this.prod.id,this.storeafect.id,this.storeprod).subscribe(res=>this.listproducts=res);

  this.noview=false;
  this.qteError=true;
  }else{
  
   this.storeProductForm.controls.qte.invalid;
    this.qteError=false;
 
  }

}

showitafter=true;
noview=false;

viewListsp(){
  this.showitafter=false;
  this.servsp.AfficherParCritere("STORE_ID",""+this.storeafect.id).subscribe(res=>this.listStoreProduct=res);
}





// *************************** END AFFECT PRODUCTS TO STORE ****************************




// .................................SHOW STORE PRODUCT  




openLg3(content3,ids) {

  this.servsp.AfficherParCritere("STORE_ID",""+ids).subscribe(res=>this.listStoreProduct=res);

  this.modalService.open(content3,{ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason3(reason)}`;
  });

  
}

private getDismissReason3(reason: any): string {

  this.showstoreprod=true;
  this.storeProductForm.reset();
  this.noview=false;
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }

  
  
}

delete1(ids){

  this.servsp.SupprimerStoreProduct(ids).subscribe(res=>this.listStoreProduct=res);

}




}

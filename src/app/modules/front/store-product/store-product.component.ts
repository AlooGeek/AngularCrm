import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent  } from '@agm/core';
import { StoreProduct } from 'src/app/core/models/StoreProduct';
import { StoreProductService } from 'src/app/core/services/StoreProductService';
import { StoreService } from 'src/app/core/services/StoreService';
import { Store } from 'src/app/core/models/Store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css','../home/home.component.css']
})
export class StoreProductComponent implements OnInit {

  

  listStore:Store[];
  listStoreProduct:StoreProduct[];

  
  constructor(private router:Router,private servstore:StoreService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private servsp:StoreProductService) { }

  

  ngOnInit() {



  
    this.getAllStores();
    this.getAllStoreProducts();

        
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
    })



  }





getAllStores(){
  this.servstore.AfficherStore().subscribe(res=>this.listStore=res);
}

getAllStoreProducts(){
  this.servsp.AfficherStoreGROUPBYSTORE().subscribe(res=>this.listStoreProduct=res);
}

















  /************************************************  GOOGLE MAP API ***************************************/

 
  zoom: number = 9;
  latitude: number;
  longitude: number;
  address: String="Tunis";
  private geoCoder;


  labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'Your Position',
    }

//Position Actuelle
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 9;
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
          this.zoom = 9;
          this.address = results[0].formatted_address;
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }


  goto(ids){
    //this.router.navigate(['/auth']);

    this.router.navigateByUrl('/products/'+ids);
  }




}

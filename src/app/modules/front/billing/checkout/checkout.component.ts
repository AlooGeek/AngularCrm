import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Offer } from 'src/app/core/models/Offer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  offer:Offer;

  couponForm = new FormGroup({
    'coupon':new FormControl('',[Validators.required]),
  

    });

  constructor(private api: ApiService) { }

  ngOnInit() {
  }



  verifyCoupon(){
    this.offer = new Offer;
    this.api.get("/offer/checkOffer/"+this.couponForm.controls.coupon.value).subscribe(res=>this.offer=res);
    //console.log(this.offer);
  }
}

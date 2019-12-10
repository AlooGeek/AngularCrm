import { Component, OnInit,AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreProduct } from 'src/app/core/models/StoreProduct';
import { Offer } from 'src/app/core/models/Offer';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
declare var paypal:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 
  listPanier:StoreProduct[]=[];

  offer:Offer;

  couponForm = new FormGroup({
    'coupon':new FormControl('',[Validators.minLength(10),Validators.maxLength(10)]),
    });

    get couponform(){
      return this.couponForm.controls;
      
    }


  verifyCoupon(){
    this.offer = new Offer();
    this.api.get("/offer/checkOffer/"+this.couponForm.controls.coupon.value).subscribe(res=>{
      this.offer=res;
      console.log(this.offer);
      if(this.couponForm.controls.coupon.value!=null && this.offer!=null){
        this.total=this.total-((this.total*this.offer.OffReduction_amount)/100);
       // console.log(this.total);
      }
     if(this.offer.statusres=="Not Found" || this.offer==null) {
     
      alert("Coupon doesn't exist");
     }
    });
   
    //console.log(this.offer);
  }

  @ViewChild('paypal') paypalElement :ElementRef;

  paidFor :false;
  product ={
    price : 1000,
    description:'used once',
  };
  constructor(private api:ApiService) { }

  ngOnInit() {
    paypal.Buttons({
      createOrder:(data , actions)=>{

        return actions.order.create({
          purchase_units:[
            {
              description: this.product.description,
              amount : {
                currency_code:'USD',
                value: this.product.price,
              }
            }
          ]
        });
      },
      onApprove: async (data,actions)=>{
      },
    }).render(this.paypalElement.nativeElement);


    this.listPanier=JSON.parse(localStorage.getItem("panier"));
    this.calculTotal();

  }

  
res;

sendRequest(){
  this.api.post("/Document/request?id="+2).subscribe(
    data => {
    this.res=data["statusres"];
    })
}


getQuote(){
  
}
total:number =0;
calculTotal(){
  let i=0;
  let j=0
for (j=0; j<this.listPanier.length;j++){

  if (this.listPanier[i]['products']['newprice']!=0){
    this.total = this.total+this.listPanier[i]['products']['newprice'];

  }else{ 
  this.total = this.total+this.listPanier[i]['products']['unitPrice'];
    }
 
  i++;
}
}






 


 }

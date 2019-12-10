import { Component, OnInit,AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreProduct } from 'src/app/core/models/StoreProduct';
declare var paypal:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 
  listPanier:StoreProduct[]=[];

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
  this.total = this.total+this.listPanier[i]['products']['unitPrice'];
  i++;
}
}






 


 }

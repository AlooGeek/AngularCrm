import { Component, OnInit,AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { async } from 'q';
import { ApiService } from 'src/app/core/services/api.service';
declare var paypal:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 

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
              description:this.product.description,
              amount : {
                currency_code:'USD',
                value: this.product.price
              }
            }
          ]
        });
      },
      onApprove: async (data,actions)=>{
      },
    }).render(this.paypalElement.nativeElement);
  }

  sendRequest(){

  }

  getQuote(){
    
  }


 


 }

import { Component, OnInit } from '@angular/core';
import { StoreProductService } from 'src/app/core/services/StoreProductService';
import { StoreProduct } from 'src/app/core/models/StoreProduct';
import {Chart} from 'chart.js';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreService } from 'src/app/core/services/StoreService';
import { Store } from 'src/app/core/models/Store';
import { ProductService } from 'src/app/core/services/ProductService';
import { product } from 'src/app/core/models/Product';

@Component({
  selector: 'app-dashboard-core',
  templateUrl: './dashboard-core.component.html',
  styleUrls: ['../dashboard.component.css']
})
export class DashboardCoreComponent implements OnInit {

  constructor(private servsp :StoreProductService,private servprod:ProductService,private servstore:StoreService,private api: ApiService,) { }


  docs:Array<any>=[];
  listStore:Store[]=[];
  listProd:product[]=[];
  listsp:StoreProduct[]=[];
  qte:any=0;
  currentDate:Date;
 
  ngOnInit() {

    this.servstore.AfficherStore().subscribe(res=>this.listStore=res);
    this.servprod.AfficherProduit().subscribe(res=>this.listProd=res);
    this.servsp.AfficherStoreProduct().subscribe(res=>{this.listsp=res
      this.currentDate = new Date();
  

    this.listsp.forEach(element => {
      
      element.dateEntry = new Date();
      if(element.dateEntry.getFullYear()==this.currentDate.getFullYear()){
        this.qte+=element.qte;
      }

        
    });
    
    
    
    });
    

    /******************************  STORE PRODUCT */
    this.servsp.Statistique().subscribe(res=>{
       this.listStoreProduct=res

      this.listStoreProduct.forEach(e => {
        this.storex.push(e[0]);
      });

      this.listStoreProduct.forEach(x => {
        this.storey.push(x[1]);
      });

      
       this.StatStoreProduct();
      
      });
      /*************************************************** DISCOUNT */


      this.api.get("/discount/statistiqueDiscount").subscribe((data:any)=>{
        this.listestataffect=data;
        this.StatDiscount();
      });
      this.api.get("/discount/statistiqueDiscountAmount").subscribe((data:any)=>{
        this.listamount=data;
        this.StatDiscount();
      });

      /*****************************************DOCUMENT  */
      
      this.api.get("/Document/getAll").subscribe(
        data =>{ this.docs=data;
        this.charts();
      }
        );
   
  }

 

  /*            STATISTIC STORE PRODUCT                            **/


  listStoreProduct:StoreProduct[]=[];
  storex:any[]=[];
  storey:any[]=[];
  BarChart:any=[];
  StatStoreProduct(){

    this.BarChart = new Chart('bar-chart', {
    type: 'bar',
    data: {

      labels: this.storex,
      datasets: [
        {
          label: "STORE (products)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: this.storey,
        }
      ]
    },
    options: {
      legend: { display: true },
      title: {
        display: true,
        text: 'The shop that has the maximum of product'
      }
    }
});

  }

  /********************************************************************** */

  listestataffect:[];
  listamount:[];


  StatDiscount(){
    // Bar chart:
    this.BarChart = new Chart('barChartdis', {
      type: 'doughnut',
      data: {
        labels: this.listamount,
        datasets: [
          {
            label: "Discount",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: this.listestataffect
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Number of affectation per Discount'
        }
      }
    
    });
    
    
      }


      /*           DOCUMENT CHART                              */ 

      LineChart:any=[];
      charts(){
      
        this.LineChart = new Chart('lineChart', {
          type: 'line',
        data: {
         labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sep","Oct","Nov","Dec"],
         datasets: [{
             label: 'Number of Items Sold in Months',
             data: [0,0,0,0,0,0,0,0,0,0,0,6],
             fill:false,
             lineTension:0.2,
             borderColor:"red",
             borderWidth: 1
         }]
        }, 
        options: {
         title:{
             text:"Line Chart",
             display:true
         },
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true
                 }
             }]
         }
        }
        });
      
        
      // Bar chart:
      this.BarChart = new Chart('barChart', {
        type: 'bar',
      data: {
       labels: ["Samsung A30", "iPhone Xs"],
       datasets: [{
           label: '# of sells',
           data: [4,2 ],
           backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
       }]
      }, 
      options: {
       title:{
           text:"Bar Chart",
           display:true
       },
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero:true
               }
           }]
       }
      }
      });

    }


}

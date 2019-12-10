import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../../core/services/document.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Doc } from 'src/app/core/models/doc';
import {Chart} from 'chart.js';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
 docs:Array<any>=[];

 document = new Doc();

 states:any= ['treated','notTreated','canceled','validated','payed','notPayed'];
 types:any=['quote','bill','command']
  res;
  date;
  LineChart=[];
  BarChart=[];
  PieChart=[];
  listDocs:[];
 
  constructor(private api:ApiService,private docservice : DocumentService ) { }

  ngOnInit() {

  this.api.get("/Document/getAll").subscribe(
    data =>{ this.docs=data;
    this.charts();
  }
    );

  }
  

  delete (id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.api.delete("/Document/delete?id="+id).subscribe(data => {
        location.reload();
      } ,(err)=>{
        console.log(err);
      })
    }
  } 
  
  add (form){

    if(this.document.id ==null){
      this.api.post("/Document/add").subscribe(data =>{
        location.reload();
      }, (err)=>{
        console.log(err);
      });
    }else{
      this.api.put("/Document/update",this.document).subscribe( data => {
         location.reload();
        }, (err)=>{
          console.log(err);
        });     
    }

  }
  

  edit(document) {
    this.document = document;
  }

  validate(idDoc,idPrd,qte){
    
    this.api.post("/Document/validaterequest?idDoc="+idDoc+"&idProd="+idPrd+"&qte="+qte)
      .subscribe(data =>{
        location.reload();
      },(err)=>{
        console.log(err);
      });
    }
  

  track(id){
    this.api.post("/Document/track?id="+id).subscribe(
      data => {
this.res=data["statusres"];
      }
    );

  }

  downloadPdf(){
    const options = {
      filename : 'listDocs.pdf',
      html2canvas : {type: 'png'},
      jsPDF: { orientation : 'landscape'}
    }; 
    const content: Element = document.getElementById('pdfcontent');
    html2pdf()
    .from(content)
    .set(options)
    .save();
    }


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

// pie chart:
this.PieChart = new Chart('pieChart', {
  type: 'pie',
data: {
 labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
 datasets: [{
     label: '# of Votes',
     data: [9,7 , 3, 5, 2, 10],
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

import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { ApiService } from 'src/app/core/services/api.service';
import { Doc } from 'src/app/core/models/doc';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bill-pdf',
  templateUrl: './bill-pdf.component.html',
  styleUrls: ['./bill-pdf.component.css']
})
export class BillPdfComponent implements OnInit {
  name = 'Your Bill';
  paramurl: any;
  @ViewChild('content') content: ElementRef;
  constructor(private api:ApiService,private ar:ActivatedRoute) { }

  ngOnInit() {
    this.ar.paramMap.subscribe(
      result=> this.paramurl=result.get('id'));

      this.api.post("/Document/getDoc?id="+this.paramurl).subscribe(
        data => {
        this.doc=data;
        }
      );

      this.api.post("/Document/getDocDetails?id="+this.paramurl).subscribe(
        data => {
        this.details=data;
        }
      );
  }
  
  downloadPdf(){
  const options = {
    filename : 'your-bill.pdf',
    html2canvas : {type: 'png'},
    jsPDF: { orientation : 'landscape'}
  }; 
  const content: Element = document.getElementById('content');
  html2pdf()
  .from(content)
  .set(options)
  .save();
  }
  doc:Doc;
  details:Array<any>=[];

  getDoc(paramurl){
    this.api.post("/Document/getDoc?id="+paramurl).subscribe(
      data => {
      this.doc=data;
      }
    );
  }
  getDetails (paramurl){
    
    this.api.post("/Document/getDocDetails?id="+paramurl).subscribe(
      data => {
      this.details=data;
      }
    );
  }

}

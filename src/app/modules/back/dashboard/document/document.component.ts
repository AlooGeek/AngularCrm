import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../../core/services/document.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Document } from 'src/app/core/models/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
 docs:Array<any>=[];

 document = new Document();

 states:any= ['Treated','Not Treated','canceled','validated','payed','notPayed'];
 types:any=['quote','bill','command']


 
  constructor(private api:ApiService,private docservice : DocumentService ) { }

  ngOnInit() {

  this.docservice.getDocument().subscribe(data => this.docs=data);

  }
  

  delete (id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.docservice.deleteDocument(id).subscribe(data => {
        location.reload();
      })
    }
  } 
  
  add (form){

    if(this.document.id ==null){
      this.api.post("/Document/add").subscribe(data =>{
        location.reload();
      });
    }else{
      this.api.put("/Document/update",this.document).subscribe( data => {
         location.reload();
        });     
    }

  }
  

  edit(document) {
    this.document = this.document;
  }

  validate(idDoc,idPrd,qte){
    
    this.api.post("/Document/validaterequest?idDoc="+idDoc+"&idProd="+idPrd+"&qte="+qte)
      .subscribe(data =>{
        location.reload();
      });
  }

  track(id){
    this.api.post("/Document/track?id="+id).subscribe(
      data => {
        location.reload();
      }
    );

  }

}

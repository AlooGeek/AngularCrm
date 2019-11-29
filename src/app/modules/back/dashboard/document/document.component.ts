import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../../core/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
 docs: Document[];
 
  constructor(private docservice : DocumentService ) { }

  ngOnInit() {
    return this.docservice.getDocument().subscribe(data=>this.docs=data);
  }

  delete (id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.docservice.deleteDocument(id).subscribe(data => {
        this.ngOnInit()
      })
    }
  } 
  
  add (){
    this.docservice.addDocument().subscribe(data => this.docs )



  }
  

}

import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { Doc } from 'src/app/core/models/doc';
import { SortPipe } from './sort.pipe';
import { UiService } from './ui.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css','./management.component.scss']
})
export class ManagementComponent implements OnInit {
  docs:Array<any>=[];
  doc:Doc = new Doc();
  docList:Doc[];
  res;
  id;
  searchText;
  constructor(private route : ActivatedRoute , private api:ApiService,private docservice : DocumentService, private sortPipe: SortPipe, private uiService: UiService ) {
   
   }

  ngOnInit() {
    this.api.get("/Document/getAll").subscribe(data => {this.docs=data;
    },(err)=>{
      console.log(err);
    });
     this.res; 
     this.populateDocs(); 
       

  }
  
  request(){
    this.api.post("/Document/request")
    .subscribe(data =>{
      this.res=data["statusres"];
      console.log(this.res);
      location.reload();
    },(err)=>{
      console.log(err);
    });
  }
  cancel(id){
    this.api.post("/Document/cancelrequest?id="+id)
    .subscribe(data =>{
      this.res=data["statusres"];
      console.log(this.res);
      location.reload();
    },(err)=>{
      console.log(err);
    });

  }
  reminder(id){
    this.api.post("/Document/reminder?id="+id)
    .subscribe(data =>{
      this.res=data["statusres"];
    },(err)=>{
      console.log(err);
    });

  }
  show:boolean=false;
  txtBtn:string="Details";

  showDetails(id){

    if (this.show ==false){
      this.show=true;
      this.txtBtn="Hide";
    }  else{
      this.show=false;
      this.txtBtn="Details";
    }
    this.api.post("/Document/reminder?id="+id)
    .subscribe(data =>{
      this.res=data["statusres"];
    },(err)=>{
      console.log(err);
    });
  }
  onSort(sortBy: string) {
    this.sortPipe.transform(
      this.docs,
      sortBy.replace(':reverse', ''),
      sortBy.endsWith(':reverse')
    );
    this.uiService.sorting$.next(sortBy);
  }
  private populateDocs() {
    this.api.get("/Document/getAll").pipe(
    switchMap(docList => {
      this.docs = docList;
      return this.route.queryParamMap;
    }),
  
    )
    .subscribe();
  }


}

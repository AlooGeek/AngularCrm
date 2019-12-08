import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Doc } from 'src/app/core/models/doc';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  doc = new Doc();
  res:string;
  paramurl: any;
  id:any = this.ar.paramMap.subscribe(
    result=> this.paramurl=result.get('id'));
  @ViewChild('content') content: ElementRef;
  constructor(private api:ApiService,private ar:ActivatedRoute) { }
  ngOnInit() {
    this.res;
    this.ar.paramMap.subscribe(
      result=> this.paramurl=result.get('id'));
      console.log(this.id[0]);

  }


  track(id){
    this.api.post("/Document/track?id="+id).subscribe(
      data => {
      this.res=data["statusres"];
      }
    );

  }

  



}


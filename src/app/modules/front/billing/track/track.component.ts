import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Document } from 'src/app/core/models/document';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  doc = new Document();
  res:string;
  constructor(private api:ApiService) { }

  ngOnInit() {
  }

  track(id){
    this.api.post("/Document/track?id="+id).subscribe(
      data => {
        location.reload();
        return this.res = data;
      }
    );


  }
}

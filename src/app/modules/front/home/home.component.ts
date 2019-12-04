import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Discount } from 'src/app/core/models/Discount';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //src/assets/images/discount/${n}
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private api: ApiService,config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  listdiscount:Discount[];

  


  ngOnInit() {
    this.getAllDiscounts();
  }


  
  getAllDiscounts(){
    this.api.get("/discount").subscribe(res=>this.listdiscount=res);
  }
}

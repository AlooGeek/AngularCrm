import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreProductService } from 'src/app/core/services/StoreProductService';
import { StoreProduct } from 'src/app/core/models/StoreProduct';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../back.component.css']
})
export class DashboardComponent implements OnInit {

  private username=localStorage.getItem('username');

  constructor(private api:ApiService) { }




  ngOnInit() {
    //just making this api call so that it returns unothorized if user not allowed
    this.api.get("/user/all").subscribe(res=>res);
    
  }






  onLogOut(){
    localStorage.clear();
  }

}

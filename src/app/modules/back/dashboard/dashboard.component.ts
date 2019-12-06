import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../back.component.css']
})
export class DashboardComponent implements OnInit {

  private username=localStorage.getItem('username');

  constructor() { }

  ngOnInit() {
  }
  onLogOut(){
    localStorage.clear();
  }

}

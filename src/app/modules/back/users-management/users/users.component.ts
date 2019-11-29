import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css','../../back.component.css']
})
export class UsersComponent implements OnInit {
  dtOption;any;

  // this will contains data list fetched from database;
  dataList=new Array<User>();

  //this is from model
  user=new User();

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    /**
     * this method fetchs users from server
     */
    this.api.get('/user/all').subscribe(data=>this.dataList=data);
    this.user.type='Individual';

     /**
     * this method will initiate the datatable after the element are loaded
     * which is not the best practice but it works for now
     */
    setTimeout(function(dataTable){
      this.dtOption = {
        paging: true,
        ordering: true,
        info: true,
        responsive: true
      };
      $('#table').DataTable(this.dtOption);
    },100);  
  }

  /**
   * this methods get triggered when the form is submitted
   */
  onSubmit(form){
    if(this.user.id == null){
      this.api.post('/user',this.user).subscribe(data=>{
        location.reload();      
      });
    }
    else{
      this.api.put('/user',this.user).subscribe(data=>{
        location.reload();      
      });

    }    
  }
  /**
   * this method is triggered when the user click on edit button
   */
  onEdit(user){
    this.user=user;
  }

}

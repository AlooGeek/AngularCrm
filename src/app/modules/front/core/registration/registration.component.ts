import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  //this will contain the user information from the form
  private user=new User();

  constructor( private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.user.type='Individual';
  }

  onSubmit(form){
    if(form.valid){
      console.log('hello');
      this.api.post('/user/register',this.user).subscribe(data=>{
        if (data != null) {
          let authString = data.username + ":" + data.password;
          localStorage.setItem("username", data.username);
          localStorage.setItem("role",data.roleRoleName);
          localStorage.setItem("basicauth", btoa(authString));
          if(data.roleRoleName=='ROLE_ADMIN'){
            this.router.navigateByUrl('/admin');
          }
          else this.router.navigateByUrl('');
         
        }        
      });
    }
  }

}

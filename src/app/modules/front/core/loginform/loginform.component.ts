import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-loginform",
  templateUrl: "./loginform.component.html",
  styleUrls: ["./loginform.component.css"]
})
export class LoginformComponent implements OnInit {

  user = new User();
  errorMessage:string='';

  constructor(
    private api: ApiService,
    private router:Router
  ) {}

  ngOnInit() {}

  onSubmit(form) {
    this.api.post("/user/authenticate", this.user).subscribe(data => {
      if (data != null) {
        console.log(data);
        let authString = data.username + ":" + data.password;
        localStorage.setItem("username", data.username);
        localStorage.setItem("role",data.roleRoleName);
        localStorage.setItem("basicauth", btoa(authString));
        console.log(localStorage.getItem('basicauth'));
        if(data.roleRoleName=='ROLE_ADMIN'){
          this.router.navigateByUrl('/admin');
        }
      }
      else this.errorMessage='username or password are incorrect';
    });
  }
}

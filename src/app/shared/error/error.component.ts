import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  private errorStatus;//this string will get the error status from the url
  
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.errorStatus=this.route.snapshot.paramMap.get('status');
  }

  /**
   * This method gets triggered when the user clicks on get back
   * This will redirect him to the home page
   */
  goBackRedirection(){
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { StoreProduct } from 'src/app/core/models/StoreProduct';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //this variable will be used to display the user's username in the top right corner
  //of the header
  username:string=localStorage.getItem('username');

  constructor(private modalService: NgbModal,private router:Router) { }




  ngOnInit() {

    this.listPanierstore = JSON.parse(localStorage.getItem("panier"));


  }

  closeResult: string;



  listPanier : StoreProduct[]=[];

  listPanierstore:StoreProduct[]=[];




  open(content,p) {

    this.listPanier=JSON.parse(localStorage.getItem("panier"));
   if (p!="nothing"){
  if (this.listPanier.length==0){
    this.listPanier.push(p);
    localStorage.setItem("panier", JSON.stringify(this.listPanier));
  
  }else{

    this.listPanier=JSON.parse(localStorage.getItem("panier"));
    var b=false;
      this.listPanier.forEach(lp => {

        if (lp.id==p.id){
          b=true;
        }
        
        
      });

      if (b==false){
        this.listPanier.push(p);
        localStorage.setItem("panier", JSON.stringify(this.listPanier));
      }
  }


}

this.listPanierstore = JSON.parse(localStorage.getItem("panier"));



    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }





delete(i){
 
    this.listPanier= JSON.parse(localStorage.getItem("panier"));

    this.listPanier.splice(i,1);
    localStorage.setItem("panier", JSON.stringify(this.listPanier));

    this.listPanierstore=JSON.parse(localStorage.getItem("panier"));
}

tobilling(){
  this.router.navigateByUrl('billing/checkout');
  this.modalService.dismissAll();
}


  onLogOut(){
    localStorage.clear();
    location.reload();
  }

}

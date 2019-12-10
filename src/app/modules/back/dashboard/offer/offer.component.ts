import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/core/models/Offer';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {


  offerForm = new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'StartDate':new FormControl('',[Validators.required]),
    'EndDate':new FormControl('',[Validators.required]),
    'ReductionAmount':new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
    'Description':new FormControl('',[Validators.required])

    });

    offerFormUpdate = new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'StartDate':new FormControl('',[Validators.required]),
      'EndDate':new FormControl('',[Validators.required]),
      'ReductionAmount':new FormControl('',[Validators.required]),
      'Description':new FormControl('',[Validators.required])
  
      });
    
      getofferfUpdate(){
        return this.offerFormUpdate.controls;
      }
    get offerf(){
      return this.offerForm.controls;
      
    }
  listOffer: Offer[];
  listUser:User[];
  offer:Offer;
  SelectedOffer:Offer;

  closeResult: string;


  constructor(private api : ApiService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllOffer();
    this.getBestUsersWithoutOffer();
   

  }

  open(content,i) {
    this.SelectedOffer=this.listOffer[i];
    console.log(this.SelectedOffer);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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



  getAllOffer(){
    this.api.get("/offer").subscribe(res=> this.listOffer=res);
  }


  getBestUsersWithoutOffer(){
    this.api.get("/offer/bestusers").subscribe(res=> this.listUser=res);
  }

  AffectOffer(code){
    this.api.put("/offer/affected/"+code).subscribe(res=> this.listUser=res);
    window.location.reload();

  }

  
  AddOffer(){
    this.offer = new Offer;
    this.offer.OffName =this.offerForm.controls.name.value;
    this.offer.OffStartDate=this.offerForm.controls.StartDate.value;
    this.offer.OffEndDate=this.offerForm.controls.EndDate.value;
    this.offer.OffReduction_amount=this.offerForm.controls.ReductionAmount.value;
    this.offer.OffDescription=this.offerForm.controls.Description.value;

    this.api.post("/offer",this.offer).subscribe(data=>{
      console.log("Offer added");
    });
    window.location.reload();
  }

  DeleteOffer(code){
    this.api.delete("/offer/"+code).subscribe();
   window.location.reload();
  }

  UpdateOffer(code){
    this.offer =this.SelectedOffer;
    this.offer.OffCode=this.SelectedOffer.OffCode;
    if(this.offerFormUpdate.controls.name.value==""){
      this.offer.OffName=this.SelectedOffer.OffName;
    }
    else{
      this.offer.OffName =this.offerFormUpdate.controls.name.value;

    }

    if(this.offerFormUpdate.controls.StartDate.value==""){
      this.offer.OffStartDate=this.SelectedOffer.OffStartDate;
    }
    else{
      this.offer.OffStartDate=this.offerFormUpdate.controls.StartDate.value;

    }

    if(this.offerFormUpdate.controls.EndDate.value==""){
      this.offer.OffEndDate=this.SelectedOffer.OffEndDate;
    }
    else{
      this.offer.OffEndDate=this.offerFormUpdate.controls.EndDate.value;

    }

    
    if(this.offerFormUpdate.controls.ReductionAmount.value==""){
      this.offer.OffReduction_amount=this.SelectedOffer.OffReduction_amount;
    }
    else{
      this.offer.OffReduction_amount=this.offerFormUpdate.controls.ReductionAmount.value;
    }
    if(this.offerFormUpdate.controls.Description.value==""){
      this.offer.OffDescription=this.SelectedOffer.OffDescription;
    }
    else{
      this.offer.OffDescription=this.offerFormUpdate.controls.Description.value;
    }



    this.api.put("/offer/"+code,this.offer).subscribe();
  }


  

}

import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/core/models/Discount';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { product } from 'src/app/core/models/Product';
import { ExcelService } from 'src/app/core/services/excel.service';
declare var $;
import {Chart} from 'chart.js';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})


export class DiscountComponent implements OnInit {


  
  discountForm = new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'StartDate':new FormControl('',[Validators.required]),
    'EndDate':new FormControl('',[Validators.required]),
    'ReductionAmount':new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
    'Description':new FormControl('',[Validators.required])

    });

    discountFormUpdate = new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'StartDate':new FormControl('',[Validators.required]),
      'EndDate':new FormControl('',[Validators.required]),
      'ReductionAmount':new FormControl('',[Validators.required]),
      'Description':new FormControl('',[Validators.required])
  
      });

    get discountd(){
      return this.discountForm.controls;
      
    }


    productaffectForm=new FormGroup({
      'discount':new FormControl('',[Validators.required])
    });
    
    get productf(){
      return this.productaffectForm.controls;
      
    }

    listdiscount:any[];
  discount:Discount;
  SelectedDiscount:Discount;
  closeResult: string;
product:product;
  listProduct:product[];

  //charts
  LineChart:any=[];
  BarChart:any=[];
  PieChart:any=[];
  listestataffect:[];
listamount:[];

  constructor(private api: ApiService,private modalService: NgbModal,private excelService:ExcelService) { }

  ngOnInit() {
    this.api.get("/discount/statistiqueDiscount").subscribe((data:any)=>{
      this.listestataffect=data;
      this.StatDiscount();
    });
    this.api.get("/discount/statistiqueDiscountAmount").subscribe((data:any)=>{
      this.listamount=data;
      this.StatDiscount();
    });
  //  this.StatDiscount();
    this.getAllDiscounts();
    this.getProductWithoutDiscount();
   
    /*
    setTimeout(function(dataTable) {
      this.dtOption = {
        paging: true,
        ordering: true,
        info: true,
        responsive: true
      };
      $("#table").DataTable(this.dtOption);
    }, 300);*/
    

     // Line chart:



    
  }




  getAllDiscounts(){
    this.api.get("/discount").subscribe(res=>this.listdiscount=res);
    
  }


  open(content,i) {
    this.SelectedDiscount=this.listdiscount[i];
    console.log(this.SelectedDiscount);
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



  AddDiscount(){
    this.discount = new Discount;
    this.discount.Name =this.discountForm.controls.name.value;
    this.discount.StartDate=this.discountForm.controls.StartDate.value;
    this.discount.EndDate=this.discountForm.controls.EndDate.value;
    this.discount.Reduction=this.discountForm.controls.ReductionAmount.value;
    this.discount.Description=this.discountForm.controls.Description.value;
    this.api.post("/discount",this.discount).subscribe(data=>{
      console.log("discount added");
    });
    window.location.reload();
  }

  
  Deletediscount(id){
    if (window.confirm('Are you sure, you want to delete?')){
    this.api.delete("/discount/"+id).subscribe();
    window.location.reload();
  }
  }

  getProductWithoutDiscount(){
    this.api.get("/discount/productsnotdiscounted").subscribe(res=> this.listProduct=res);
  }

  Updatediscount(id){
    this.discount =this.SelectedDiscount;
    this.discount.id=this.SelectedDiscount.id;
    if(this.discountFormUpdate.controls.name.value==""){
      this.discount.id=this.SelectedDiscount.id;
    }
    else{
      this.discount.Name =this.discountFormUpdate.controls.name.value;

    }

    if(this.discountFormUpdate.controls.StartDate.value==""){
      this.discount.StartDate=this.SelectedDiscount.StartDate;
    }
    else{
      this.discount.StartDate=this.discountFormUpdate.controls.StartDate.value;

    }

    if(this.discountFormUpdate.controls.EndDate.value==""){
      this.discount.EndDate=this.SelectedDiscount.EndDate;
    }
    else{
      this.discount.EndDate=this.discountFormUpdate.controls.EndDate.value;

    }

    
    if(this.discountFormUpdate.controls.ReductionAmount.value==""){
      this.discount.Reduction=this.SelectedDiscount.Reduction;
    }
    else{
      this.discount.Reduction=this.discountFormUpdate.controls.ReductionAmount.value;
    }
    if(this.discountFormUpdate.controls.Description.value==""){
      this.discount.Description=this.SelectedDiscount.Description;
    }
    else{
      this.discount.Description=this.discountFormUpdate.controls.Description.value;
    }


    this.api.put("/discount/"+id,this.discount).subscribe(res=>this.listdiscount=res);

  }


    
  AffectDiscountToProduct(i){

    this.product=this.listProduct[i];
    // this.SelectedDiscount=this.listdiscount[i];

    this.api.put("/product/affect/"+this.productaffectForm.controls.discount.value,this.product).subscribe();
    location.reload();

  }

  download(){
    this.excelService.downloadFile(this.listdiscount, 'Discount');
  }


  StatDiscount(){
// Bar chart:
this.BarChart = new Chart('barChart', {
  type: 'doughnut',
  data: {
    labels: this.listamount,
    datasets: [
      {
        label: "Discount",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: this.listestataffect
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Number of affectation per Discount'
    }
  }

});


  }

}

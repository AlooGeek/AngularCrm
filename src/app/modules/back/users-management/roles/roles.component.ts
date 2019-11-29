import { Component, OnInit } from "@angular/core";
import { Role } from 'src/app/core/models/role';
import { ApiService } from 'src/app/core/services/api.service';
declare var $;

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css", "../../back.component.css"]
})
export class RolesComponent implements OnInit {
  // this will contains data list fetched from database;
  dataList = new Array<Role>();

  //this is from model
  user = new Role();

  constructor(private api: ApiService) {}

  ngOnInit() {
    /**
     * this method fetchs users from server
     */
    this.api.get("/role/all").subscribe(data => (this.dataList = data));

    /**
     * this method will initiate the datatable after the element are loaded
     * which is not the best practice but it works for now
     */
    setTimeout(function(dataTable) {
      this.dtOption = {
        paging: true,
        ordering: true,
        info: true,
        responsive: true
      };
      $("#table").DataTable(this.dtOption);
    }, 200);
  }

  /**
   * this methods get triggered when the form is submitted
   */
  onSubmit(form) {
    if (this.user.id == null) {
      this.api.post("/role", this.user).subscribe(data => {
        location.reload();
      });
    } else {
      this.api.put("/role", this.user).subscribe(data => {
        location.reload();
      });
    }
  }
  /**
   * this method is triggered when the user click on edit button
   */
  onEdit(user) {
    this.user = user;
  }
  onDelete(user) {
    this.api.delete("/role/" + user.id).subscribe(data => {
      location.reload();
    });
  }
}

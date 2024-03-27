import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allprofile',
  templateUrl: './allprofile.component.html',
  styleUrls: ['./allprofile.component.css']
})
export class AllprofileComponent implements OnInit {
  constructor(private getUser: DataService, private route: Router) { }
  UsersDetails: any;

  ngOnInit(): void {
    this.retriveUser();
  }

  retriveUser() {
    this.getUser.getUser().subscribe(data => {
      this.UsersDetails = data;
      console.log(data)
    }, (err) => {
      console.log("data cant retrieve", err)
    })
  }

  updateUser(id: any) {
    this.route.navigateByUrl("/updateuser/" + id);
  }


  updatePic(id: any) {
    this.route.navigateByUrl("/updatepic/" + id);
  }

}

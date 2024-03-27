import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private getUser: DataService, private router: Router, private route: ActivatedRoute) { }
  UsersDetails: any;
  user: any; 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id']; // Get the user ID from the route parameters
      if (userId) {
        this.getUser.getUserById(userId).subscribe((data: any) => {
          this.user = data; // Set the user details retrieved from the service
        }, (err) => {
          console.log("Data can't retrieve", err);
        });
      }
    });
  }

  retriveUser() {
    this.getUser.getUser().subscribe(data => {
      this.UsersDetails = data;
      console.log(data);
    }, (err) => {
      console.log("Data can't retrieve", err);
    });
  }
  updateUser(id: any) {
    this.router.navigateByUrl("/updateuser/" + id);
  }


  updatePic(id: any) {
    this.router.navigateByUrl("/updatepic/" + id);
  }

}



  
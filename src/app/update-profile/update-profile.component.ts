import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  Image = '/assets/Images/back.jpeg';
  url = '/assets/Images/1.png';

  id: any;
  userData: any;

  updateForm = new FormGroup({
    id: new FormControl(''),
    userimage: new FormControl(null),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contacts: new FormControl('',[(Validators.required)]) ,
    age: new FormControl('' ,Validators.required),
    tags: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),

  });

  constructor(private route: ActivatedRoute, private user: DataService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.userData=this.user.getUserById(this.id).subscribe(
      (data: any) => {
        this.userData = data;
        this.updateForm.patchValue(this.userData);
        console.log(this.userData);
        
        this.url = this.userData.userimage;
      },
      error => {
        console.error('Error fetching user details:', error);
        // Handle error
   });
  }

  onUpdate() {
    if (this.updateForm.valid) {
      const updatedData =  {
        id: this.updateForm.value.id,
        userimage: this.url,
        firstname: this.updateForm.value.firstname,
        lastname: this.updateForm.value.lastname,
        email: this.updateForm.value.email,
        contacts: this.updateForm.value.contacts,
        age: this.updateForm.value.age,
        tags: this.updateForm.value.tags,
        state: this.updateForm.value.state,
        country: this.updateForm.value.country,
  };
  this.user.updateDetail(this.id, updatedData).subscribe((data) => {
    console.log(data);
    alert('Picture updated successfully');
    this.router.navigate(['/allprofile']);
  }, (err) => {
    console.log("Error updating data", err);
  });
  }
  }
  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.updateForm.patchValue({ userimage: event.target.result });
      }
    }
  }
  
}

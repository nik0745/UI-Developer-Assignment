import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  isFormDirty = false;
  Image = '/assets/Images/back.jpeg';
  url = '/assets/Images/1.png';

  id: any;
  userData: any;

  countries = [
    { name: 'India', states: ['Gujarat', 'Rajasthan', 'Maharashtra', 'Delhi', 'Tamil Nadu'] },
    { name: 'USA', states: ['California', 'Texas', 'New York', 'Colorado', 'Indiana'] },
    { name: 'UK', states: ['England', 'Scotland', 'Wales', 'Northem Ireland'] },
    { name: 'AUSTRALIA', states: ['Hokkaido', 'Chibe', 'Fukui', 'Gunma'] },
    { name: 'JAPAN', states: ['Victoria', 'Queensland', 'Tasmania', 'South Wales', 'Western Australia', 'South Australia'] }
  ];
  states: string[] = [];
  profileForm = new FormGroup({
    id: new FormControl(''),
    userimage: new FormControl(null),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contacts: new FormControl('', [(Validators.required)]),
    age: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    addressType: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    companyAddress1: new FormControl(''),
    companyAddress2: new FormControl(''),

  });

  constructor(private route: ActivatedRoute, private UpdateSer: DataService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.userData = this.UpdateSer.getUserById(this.id).subscribe(
      (data: any) => {
        this.userData = data;
        this.profileForm.patchValue(this.userData);
        console.log(this.userData);
        this.onCountryChange();
        this.url = this.userData.userimage;
        this.profileForm.get('state')?.setValue(this.userData.state);
      },
      error => {
        console.error('Error fetching user details:', error);
        // Handle error
      });

    this.profileForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.profileForm.dirty; // Set isFormDirty flag based on form dirtiness
    });
  }


  onCountryChange(): void {
    const selectedCountry = this.profileForm.get('country')?.value;
    const country = this.countries.find(c => c.name === selectedCountry);
    if (country) {
      this.states = country.states;
      this.profileForm.patchValue({ state: '' }); // Reset selected state
    }
  }
  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.profileForm.patchValue({ userimage: event.target.result });
      }
    }
  }
  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedData = {
        id: this.profileForm.value.id,
        userimage: this.url,
        firstname: this.profileForm.value.firstname,
        lastname: this.profileForm.value.lastname,
        email: this.profileForm.value.email,
        contacts: this.profileForm.value.contacts,
        age: this.profileForm.value.age,
        tags: this.profileForm.value.tags,
        state: this.profileForm.value.state,
        country: this.profileForm.value.country,
        addressType: this.profileForm.value.addressType,
        address1: this.profileForm.value.addressType === 'home' ? this.profileForm.value.address1 : this.profileForm.value.companyAddress1,
        address2: this.profileForm.value.addressType === 'home' ? this.profileForm.value.address2 : this.profileForm.value.companyAddress2,


      };
      this.UpdateSer.updateDetail(this.id, updatedData).subscribe((data) => {
        console.log(data);
        alert('Record updated successfully');
        this.router.navigate(['/allprofile']);
      }, (err) => {
        console.log("Error updating data", err);
      });
    }
  }
}
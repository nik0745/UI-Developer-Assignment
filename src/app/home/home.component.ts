import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { imageDimensionsValidator } from 'src/app/validators';



import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Intrest {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  RegistrationForm: FormGroup = new FormGroup({});

  Image = '/assets/Images/back.jpg';
  url = '/assets/Images/1.png';

  countries = [
    { name: 'India', states: ['Gujarat', 'Rajasthan', 'Maharashtra', 'Delhi', 'Tamil Nadu'] },
    { name: 'USA', states: ['California', 'Texas', 'New York', 'Colorado', 'Indiana'] },
    { name: 'UK', states: ['England', 'Scotland', 'Wales', 'Northem Ireland'] },
    { name: 'AUSTRALIA', states: ['Hokkaido', 'Chibe', 'Fukui', 'Gunma'] },
    { name: 'JAPAN', states: ['Victoria', 'Queensland', 'Tasmania', 'South Wales', 'Western Australia', 'South Australia'] }
  ];

  states: string[] = [];

  constructor(private user: DataService, private router: Router) { }
  ngOnInit(): void {
    this.RegistrationForm = new FormGroup({
      userimage: new FormControl(null, [Validators.required, imageDimensionsValidator(310, 325)]),
      firstname: new FormControl('', [Validators.required, this.onlyAlphabetsValidator(), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, this.onlyAlphabetsValidator(), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      contacts: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      age: new FormControl('', [Validators.required, Validators.min(20), Validators.max(60)]),
      addressType: new FormControl(' '),
      homeAddress1: new FormControl(''),
      homeAddress2: new FormControl(''),
      companyAddress1: new FormControl(''),
      companyAddress2: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required,]),
    });
  }


  onlyAlphabetsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        // If the field is empty return null (no validation error)
        return null;
      }
      const onlyAlphabetsRegex = /^[a-zA-Z]+$/;
      if (!onlyAlphabetsRegex.test(value)) {
        // If the value contains non-alphabetic characters return the validation error
        return { 'onlyAlphabets': { value: value } };
      }
      // If the value contains only alphabetic characters return null (no validation error)
      return null;
    };
  }


  get isHomeSelected(): boolean {
    return this.RegistrationForm.get('addressType')?.value === 'home';
  }

  get isCompanySelected(): boolean {
    return this.RegistrationForm.get('addressType')?.value === 'company';
  }

  onCountryChange(): void {
    const selectedCountry = this.RegistrationForm.get('country')?.value;

    const country = this.countries.find(c => c.name === selectedCountry);
    if (country) {
      this.states = country.states;
      this.RegistrationForm.patchValue({ state: '' }); // Reset selected state
    }
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  Register() {

    let addressType = this.RegistrationForm.value.addressType;
    let addressFields;
  
    if (addressType === 'home') {
      addressFields = {
        addressType: addressType,
        homeAddress1: this.RegistrationForm.value.homeAddress1,
        homeAddress2: this.RegistrationForm.value.homeAddress2,
      };
    } else if (addressType === 'company') {
      addressFields = {
        addressType: addressType,
        companyAddress1: this.RegistrationForm.value.companyAddress1,
        companyAddress2: this.RegistrationForm.value.companyAddress2,
      };
    }


    const postbody = {
      userimage: this.url,
      firstname: this.RegistrationForm.value.firstname,
      lastname: this.RegistrationForm.value.lastname,
      email: this.RegistrationForm.value.email,
      contacts: this.RegistrationForm.value.contacts,
      age: this.RegistrationForm.value.age,
      address: addressFields,
      country: this.RegistrationForm.value.country,
      state: this.RegistrationForm.value.state,
      tags: this.RegistrationForm.value.tags,
    };

    this.user.createUser(postbody).subscribe(
      (data: any) => {
        console.log(data);
        alert('Registration Successful');
        setTimeout(() => {
        const userId = data.id; // Assuming 'id' is the key for the user ID in the response
        this.router.navigate(['/profile', userId]); // Navigate to the profile of the registered user
           // Scroll to the top of the page
      window.scrollTo(0, 0);
    }, 100); // Adjust the delay as needed
    
      },
      (err) => {
        console.log('Error', err);
      });
  }

  // navigateToProfile() {
  //   this.router.navigateByUrl('/profile');
  // }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  intrests: Intrest[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const values = (event.value || '').split(',').map(value => value.trim());
  
    // Add each interest individually
    values.forEach(value => {
      if (value && !this.intrests.some(interest => interest.name === value)) {
        this.intrests.push({ name: value });
      }
    });
  
    // Update the tags in the form control
    this.RegistrationForm.patchValue({ tags: this.intrests.map(interest => interest.name) });
  
    // Clear the input value after all interests are added
    event.chipInput!.clear();
  }
  
  remove(interest: Intrest): void {
    const index = this.intrests.indexOf(interest);

    if (index >= 0) {
      this.intrests.splice(index, 1);

      this.announcer.announce(`Removed ${interest}`);
    }
  }

  edit(interest: Intrest, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(interest);
      return;
    }

    // Edit existing fruit
    const index = this.intrests.indexOf(interest);
    if (index >= 0) {
      this.intrests[index].name = value;
    }
  }

}

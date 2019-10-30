import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public formBuilder: FormBuilder, private http: HttpClient) { }

  readonly baseURI = 'http://localhost:8080/api';

  formModel = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', Validators.required],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(5)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords }),
    Mobile: [''],
    StreetAddress: [''],
    Suburb: [''],
    City: [''],
    PostalCode: [''],
    Province: [''],
    IDNumber: ['']
  });

  comparePasswords(grouper: FormGroup){
    let confirmPWControl = grouper.get('ConfirmPassword');
  
    if (confirmPWControl.errors == null || 'passwordMismatch' in confirmPWControl.errors) {
      if (grouper.get('Password').value != confirmPWControl.value)
      confirmPWControl.setErrors({ passwordMismatch: true });
      else
      confirmPWControl.setErrors(null);
    }
  }

  register(){

    var body = {
      firstName : this.formModel.value.FirstName,
      lastName : this.formModel.value.LastName,
      emailAddress : this.formModel.value.Email,
      phoneNumber : this.formModel.value.Mobile,
      streetAddress : this.formModel.value.StreetAddress,
      suburb : this.formModel.value.Suburb,
      city : this.formModel.value.City,
      postalCode : this.formModel.value.PostalCode,
      province : this.formModel.value.Province,
      password : this.formModel.value.Passwords.Password
    //  IDNumber : this.formModel.value.IDNumber
    };
    return this.http.post(this.baseURI + '/customers', body);
  }
}

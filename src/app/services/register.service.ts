import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { JwtResponse } from '../response/JwtResponse';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private currentUserSubject: BehaviorSubject<JwtResponse>;
    public currentUser: Observable<JwtResponse>;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();
  constructor(public formBuilder: FormBuilder, 
    private http: HttpClient,
    private cookieService: CookieService)
     { 

      
        const memo = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
        this.currentUser = this.currentUserSubject.asObservable();
        cookieService.set('currentUser', memo);
    }
    private httpClient:HttpClient
  readonly baseURI = 'http://localhost:8080/api/auth';

  get currentUserValue() {
    return this.currentUserSubject.value;
}

  formModel = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', Validators.required],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(8)]],
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
      phoneNumber : this.formModel.value.Mobile,
      username : this.formModel.value.Email,
      email : this.formModel.value.Email,
      password : this.formModel.value.Passwords.Password,
      streetAddress : this.formModel.value.StreetAddress,
      suburb : this.formModel.value.Suburb,
      city : this.formModel.value.City,
      postalCode : this.formModel.value.PostalCode,
      province : this.formModel.value.Province,
      
    //  IDNumber : this.formModel.value.IDNumber
    };
    return this.http.post(this.baseURI + '/signup', body);
  }
  signIn(usernameOrEmail, password){

   /* const headers =new HttpHeaders({Authorization: 'Basic ' + btoa(usernameOrEmail + ':' + password)});
    return this.httpClient.post<any>(this.baseURI + '/login', {headers}).pipe(
      map(
        userData => {
          sessionStorage.setItem('usernameOrEmail', usernameOrEmail);
          let tokenStr= 'Bearer '+userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );*/
    var data = {usernameOrEmail , password};
    return this.http.post(this.baseURI + '/login', data);
  }
}

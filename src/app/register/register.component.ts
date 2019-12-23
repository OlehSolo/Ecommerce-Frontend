import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignUpInfo } from '../SignUpInfo';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(public service: RegisterService, 
    public fb: FormBuilder, private toast: 
    ToastrService, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
   /* this.service.register().subscribe(
      (response:any) => {
        if(response.success){
          this.service.formModel.reset();
            this.toast.success('New User Successfully Added.', 'Success!.');
            this.router.navigateByUrl('/login');
        }
        else{
          this.toast.error('Something not right.', 'Failed!.');
        }
      },
      err => {
        console.log(err);
      }
    );*/
         
    this.signupInfo = new SignUpInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.phoneNumber,
      this.form.email,
      this.form.email,
      this.form.password,
      this.form.streetAddress,
      this.form.suburb,
      this.form.city,
      this.form.postalCode,
      this.form.province
    )

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.toast.success('New User Successfully Added.', 'Success!.');
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
        this.toast.error('Please check the form and try again.', 'Error!.');
        this.isSignUpFailed = true;
      }
    );
        }
      
     
    
        }
      
      
       



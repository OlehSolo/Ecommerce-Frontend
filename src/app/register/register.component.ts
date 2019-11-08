import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service: RegisterService, public fb: FormBuilder, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
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
    );
        }
      
     
    
        }
      
      
       



import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service: RegisterService, public fb: FormBuilder, private toast: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res: any) => {
        if(res.succeded){
          this.service.formModel.reset();
          this.toast.success('New User Successfully Added.', 'Success!.');
        } else {
          this.service.formModel.reset();
          this.toast.success('User Successfully Added.', 'Success!.');
            }
          });
        }
      
     
    
        }
      
      
       



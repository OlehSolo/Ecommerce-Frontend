import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private service: RegisterService, private router: Router, public Toastr: ToastrService) { }

  ngOnInit() {
  }
  onSubmit(username, password){
    this.service.signIn(username, password).subscribe(
      (data: any)=>{
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/product');
      },
      err => {
       if (err.status == 400)
       this.Toastr.error('Incorrect username or password.', 'Authentication failed.');
     else
       console.log(err);
      }
    );
   }

}

import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { AuthLoginInfo } from '../LoginInfo';
import { TokenStorageServiceService } from '../token-storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usernameOrEmail: string;
  public password: string;
  public error: string;
  form: any = {  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  constructor(private service: RegisterService,private auth: AuthService, 
    private router: 
    Router, public Toastr: ToastrService, 
    private tokenStorage: TokenStorageServiceService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
  public submit(){
   /* this.service.signIn(username, password).subscribe(
      (data: any)=>{
        localStorage.setItem('token', data.token);
        let tokenStr= 'Bearer '+data.token;
          sessionStorage.setItem('token', tokenStr);
        this.router.navigateByUrl('/product');
      },
      err => {
       if (err.status == 400)
       this.Toastr.error('Incorrect username or password.', 'Authentication failed.');
     else
       console.log(err);
      }
    );*/

    this.loginInfo = new AuthLoginInfo(
      this.usernameOrEmail,
      this.password);

      this.auth.login(this.loginInfo).subscribe(
        data => {

          //alert(JSON.stringify(data));
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.usernameOrEmail);
          this.tokenStorage.saveAuthorities(data.authorities);
   
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          //this.router.navigateByUrl('/product');
          this.roles = this.tokenStorage.getAuthorities();
         this.router.navigateByUrl('/product');
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      );
   }

}

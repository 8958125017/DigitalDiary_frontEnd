import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
  
  loginDetail : any={				   
				   email       :'',
				   password    :'',          
};
 constructor(
  	public global_service:GlobalService,
  	private router: Router,
  	private fb: FormBuilder, 
  	) {
          
     }



  login(){
  this.loginDetail.email=this.loginDetail.email.toLowerCase();   
   const url =this.global_service.basepath +'admin/loginAdmin';
   this.global_service.postRequestUnathorised(url,this.loginDetail).subscribe((response)=>{
       if(response[0].json.status==200){
            this.router.navigate(['/viewAdmin']);
            this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross'); 
       }else{
          
       }
   })
  }
  
  ngOnInit() {
  	this.signupFormInit();
  }



  signupFormInit(){
      this.loginForm = this.fb.group({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
          
        
    });
  }

  

}

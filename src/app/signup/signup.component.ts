import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
	signUpForm: FormGroup;
  
  signUpDetails : any={
				   firstName       :    '',   
				   lastName        :    '',   
				   email           :    '',
				   password        :    '',
           confirmPassword :    '',
				   contactNo       :    '',
				   address         :    {
				                         line1:'',
				                         line2:'',
				                         city:'',
				                         pin:'',
				                         state:'',
				                         country:''
				                        },
				   designation     :    '',
				   department      :    '',
				   dob             :    '',
				   doj             :    '',
				   role            :    '',
           marks           :    '',
				   image           :    '',
   };

   constructor(
  	          public globalService:GlobalService,
  	          private router: Router,
  	          private fb: FormBuilder, 
            	) {
          
             
                }



   signUp(){
    console.log("this.signUpDetails = = "+JSON.stringify(this.signUpDetails));
    const url =this.globalService.basepath +'admin/createAdmin';
    this.globalService.postRequestUnathorised(url,this.signUpDetails).subscribe((response)=>{
       if(response[0].json.status==200){
         // this.router.navigate(['/login']);
        }else{
          this.globalService.showNotification('top','right',response[0].json.message,4,'ti-cross'); 
           	
        }
     })
    }
  
  ngOnInit() {
  	this.signupFormInit();
  }



  signupFormInit(){
      this.signUpForm = this.fb.group({
            'firstName': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'lastName': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            'password': new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
            'confirmPassword':new FormControl('', Validators.required),
            'contactNo': new FormControl(''),
            'line1':new FormControl(''),
            'line2':new FormControl(''),
            'city':new FormControl(''),
            'pin':new FormControl(''),
            'state':new FormControl(''),
            'country':new FormControl(''),
            'designation':new FormControl(''),
            'department':new FormControl(''),
            'dob':new FormControl(''),
            'doj':new FormControl(''),
            'role':new FormControl(''),
            'marks':new FormControl(''),
            'image':new FormControl(''),
        }, { validator: this.matchingPasswords('password', 'confirmPassword') });
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {       
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

}

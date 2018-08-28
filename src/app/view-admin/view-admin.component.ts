import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { PaginationService } from '../pagination.service';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
 declare const $: any;
@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit {
  signUpForm: FormGroup;
  adminDeleteBuId:any;
  public adminList:any=[];
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  count : number = 0;
  recordNo :number=1;
  signUpDetails : any={
  	               id              :    '',
				   firstName       :    '',   
				   lastName        :    '',   
				   email           :    '',				  
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


  constructor( public globalService:GlobalService,
  	           public paginationService:PaginationService,
  	           private router: Router,
  	           private fb: FormBuilder) { 
  this.setPage(1);
  }
     adminLength:any;
	  getAdmin(){
	  	this.adminList=[];
	  	const url =this.globalService.basepath + 'admin/getAdmin';
	  	this.globalService.GetRequest(url).subscribe((response)=>{
	  		if(response[0].json.status){
	          this.adminLength=response[0].json.data;	           
	          for(var i=0;i<this.adminLength.length;i++){
	          let objData ={
		          	         id:'',
		                     name:'',
		                     email :'',
		                     contact:'',
		                     role:'',
		                     marks :'',                                         
	                  };           
	                  objData.id=this.adminLength[i]._id;
	                  objData.name=this.adminLength[i].firstName + this.adminLength[i].lastName;
	                  objData.email=this.adminLength[i].email;
	                  objData.contact=this.adminLength[i].contactNo;
	                  objData.role=this.adminLength[i].role;
	                  objData.marks=this.adminLength[i].marks;
	                  this.adminList.push(objData);
	          }
	           
	  		}else{
                 this.globalService.showNotification('top','right',response[0].json.message,4,'ti-cross'); 
	  		}
	  	})
	  }
     
	  deleteAdmin(adminId:any){
         this.adminDeleteBuId=adminId;
        $('#deleteAdminbyIdmodel').modal('show');
      }

  		confirmAdmin(){   		  
		   let postData = {
		                   id  :  this.adminDeleteBuId
		                  }
		   const url = this.globalService.basepath+'admin/deleteAdminById'
		   this.globalService.PostRequest(url,postData).subscribe((response)=>{		     
		     this.getAdmin();
		   });
        }

   signupFormInit(){
      this.signUpForm = this.fb.group({
            'firstName': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'lastName': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
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
        });
    }

 

 getAdminById(adminId:any){
  	 $('#basicExampleModal').modal('show'); 
  	 let postData={
  	 	        id:adminId
  	 }
  	 const url=this.globalService.basepath+'admin/getAdminById'
  	 this.globalService.PostRequest(url,postData).subscribe((response)=>{ 
  	 	var res=response[0].json.json().data;	 
  	 	debugger
  	 	if(response[0].json.json().status===200){
  	 	    this.signUpDetails.id              = res._id; 
            this.signUpDetails.firstName       = res.firstName;   
		    this.signUpDetails.lastName        = res.lastName; 
		    this.signUpDetails.email           = res.email;
		    this.signUpDetails.contactNo       = res.contactNo;
		    this.signUpDetails.designation     = res.designation;
		    this.signUpDetails.department      = res.department;
		    this.signUpDetails.dob             = res.dob;
		    this.signUpDetails.doj             = res.doj;
		    this.signUpDetails.role            = res.role;
		    this.signUpDetails.marks           = res.marks;
		    this.signUpDetails.image           = res.image;
		    this.signUpDetails.address.line1   = res.address.line1;  
		    this.signUpDetails.address.line2   = res.address.line2;  
		    this.signUpDetails.address.city    = res.address.city;  
		    this.signUpDetails.address.pin     = res.address.pin;  
		    this.signUpDetails.address.state   = res.address.state;  
		    this.signUpDetails.address.country = res.address.country;
		
		   
  	 	}else{
  	 		this.globalService.showNotification('top','right',response[0].json.message,4,'ti-cross');
  	 	}
       
  	 });
  }

  updateAdmin(){
  	debugger
  	$('#basicExampleModal').modal('hide');
  	const url = this.globalService.basepath + 'admin/updateAdminById';
  	this.globalService.PostRequest(url,this.signUpDetails).subscribe((response)=>{
  		 
  		this.getAdmin();
  	})
  }
  
 ngOnInit() {
  	this.signupFormInit();
  }

    setPage(page: number){
		this.recordNo = (3*page - 3)+1;
		this.count = page;
		this.adminList=[];
			let postData = {
				pageNo :page
			}
	        const url =this.globalService.basepath + 'admin/getAdminByPageNo';
	        this.globalService.PostRequest(url,postData).subscribe((response)=>{
	            if(response[0].json.status){
		          this.adminLength=response[0].json.json().data;	           
		          for(var i=0;i<this.adminLength.length;i++){
		          let objData ={
			          	         id:'',
			                     name:'',
			                     email :'',
			                     contact:'',
			                     role:'',
			                     marks :'',                                         
		                  };           
		                  objData.id=this.adminLength[i]._id;
		                  objData.name=this.adminLength[i].firstName + this.adminLength[i].lastName;
		                  objData.email=this.adminLength[i].email;
		                  objData.contact=this.adminLength[i].contactNo;
		                  objData.role=this.adminLength[i].role;
		                  objData.marks=this.adminLength[i].marks;
		                  this.adminList.push(objData);
		          }
		           
		  		}else{
	                 this.globalService.showNotification('top','right',response[0].json.message,4,'ti-cross'); 
		  		}
	        });
	}

	//previousBoolean:boolean=false;
	previous(){		
		if(this.count === 1 ){
			//this.previousBoolean=false;
			
		}else{
		    this.count--
            this.setPage(this.count)
		}
     
	}
	next(){
      this.count++
      this.setPage(this.count)
	}

}

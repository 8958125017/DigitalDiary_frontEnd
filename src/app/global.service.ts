import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions, Request, Response} from '@angular/http';
import { Route,Router} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
declare var $: any;
@Injectable()

export class GlobalService {
		  public basepath :string;
		  public requestOption :RequestOptions;
		  public res:Response;
		  public header :Headers;
		  public userInfo:any;
		  constructor( public http:Http,public router:Router) { 
		   this.basepath='http://localhost:4008/';
		  }

		  public postRequestUnathorised(url? :string,data? :string) :any{
		  	let headers = new Headers();
		  	headers.append("Content-Type","application/json");
		  	let requestoption = new RequestOptions({
		  		method: RequestMethod.Post,
		  		url   : url,
		  		headers :headers,
		  		body   :JSON.stringify(data)
		  	});
		  	return this.http.request(new Request(requestoption))
		  	.map((res : Response)=>{
		       return [{status:res.status, json:res.json() }]
		   	})
		   	.catch((error:any) => {
		       return Observable.throw(error);
		   	})
		  }

		  public PostRequest(url:string, data: any,flag?:any): any {
		  	var token =localStorage.getItem('authToken');
		  	let headers =new Headers();
		  	headers.append("Content-Type","application/json");
		  	headers.append("authorization","jwt"+token);
		  	this.requestOption = new RequestOptions({
		  		method : RequestMethod.Post,
		  		url:url,
		  		headers:headers,
		  		body:JSON.stringify(data)
		  	})

		  	return this.http.request(new Request(this.requestOption))
		  	.map((res:Response)=>{
		  		if(res.status==200){
		  			return [{status: res.status,json:res}]
		  		}
		  	})
		  	.catch((error:any)=>{
		  		if(error.status==401){
		  			localStorage.clear();
		  			console.log(""+error.json().err.object)
		  		}
		  		if(error.status===0){
		  			console.log("Network error")
		  		}
		  		return Observable.throw(error);
		  	});
		  }

		  public GetRequest(url:string):any{
		  	return this.http.request(new Request(this.getRequestOption(url)))
		  	.map ((res:Response)=>{
		  		let jsonObj:any;
		  		if(res.status===204){
		  			jsonObj = null;
		  		}
		  		else{
		  			jsonObj = res.json()
		  		}
		  		return [{status:res.status,json:jsonObj}]
		  	})
		  	.catch(error =>{
		  		if(error.status == 0)
		  			this.consoleFun('error here', error);
		  		return Observable.throw(error)
		  	})
		  }
		  public getRequestOption(url:string):RequestOptions{
		  	let headers = new Headers();
		  	if(localStorage.getItem('authToken')){
		  		let userInfo = JSON.parse(localStorage.getItem('userInfo'))
		  	    headers.append("Content-Type","application/json");
		  	    headers.append("token",this.userInfo.token)
		  	}
		  	else{
		  		this.consoleFun('Unautorized Request !');

		  		let requestoptions = new RequestOptions({
		  			method:RequestMethod.Get,
		  			url:url,
		  			headers:headers
		  		});
		  		return requestoptions;
		  	}

		  	 
		  }
		    // Console Function
		      consoleFun(a?, b?, c?, d?, f?, g?): void {
		        // console.log(a, b, c, d, f, g);
		      }

   showNotification(from, align,message, type1, body){
      const type = ['','info','success','warning','danger'];

      const color = type[type1];

      $.notify({
          icon: "notifications",
          message: message

      },{
          type: color,
          timer: 3000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }    


	}

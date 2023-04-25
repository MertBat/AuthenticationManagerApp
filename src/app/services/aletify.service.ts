import { Injectable } from '@angular/core';
declare let alertify:any

@Injectable()
export class AletifyService {

  constructor() { }

  success(message:string){
    alertify.success(message)
  }

  alert(header:string, message:string){
    alertify.alert(header ,message)
  }

  error(message:string){
    alertify.error(message)
  }
  warning(message:string){
    alertify.warning(message)
  }

  
}

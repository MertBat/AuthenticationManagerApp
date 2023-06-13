import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()

export class JwtService{
    
    helper = new JwtHelperService

    constructor(private router:Router){}

    decodeToken(): any {
        const token = localStorage.getItem("token")
        if(token){
            const user = this.helper.decodeToken(token);
            return {name: user.name, email: user.email, authority: user.role, surname: user.surname, id: parseInt(user.id)}
        }else{
            this.router.navigateByUrl('/login')
            return null
        }
        
    }
}
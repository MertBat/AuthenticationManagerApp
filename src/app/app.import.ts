import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./main/helpers/jwt.interceptor";

export const Interceptors:any[] = [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
]
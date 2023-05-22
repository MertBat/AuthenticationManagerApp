import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';
import { finalize, from } from 'rxjs';
import { RoleService } from '../services/role.service';
import { AlertifyService } from '../services/alertify.service';
import { Role } from '../main/users/userTable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  examinationForm!: FormGroup;
  loginData: any;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private examinationService: ExaminationService,
    private roleService: RoleService,
    private alertifyService: AlertifyService,

  ) { }

  navigateSignUp() {
    this.router.navigateByUrl('/signUp');
  }

  ngOnInit(): void {
    this.accountExamination();
    localStorage.removeItem('account');
    sessionStorage.removeItem('account');
    localStorage.removeItem('permissions');
  }

  accountExamination() {
    this.examinationForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    if (this.examinationForm.valid) {
      this.loading = true;
      this.loginData = Object.assign({}, this.examinationForm.value);
      from(this.examinationService.signIn(this.loginData)).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(res => {
        this.router.navigateByUrl('/main/home');
        sessionStorage.setItem("account", "true");
        localStorage.setItem('account', JSON.stringify(res));
        this.roleService.getRoles().subscribe((data:any) => {
          const permissions = data.filter((d:Role)=> d.roleName == res.authority)
          localStorage.setItem("permissions", JSON.stringify(permissions));
        })
      },e=>{
        debugger;
        this.alertifyService.error(e.error);
      });
    }
  }
}

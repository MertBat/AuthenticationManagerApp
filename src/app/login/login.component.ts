import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';
import { finalize, from } from 'rxjs';
import { RoleService } from '../services/role.service';
import { AlertifyService } from '../services/alertify.service';
import { Role } from '../main/users/userTable';
import { AccountService } from '../services/account.service';

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
  ) {}

  navigateSignUp() {
    this.router.navigateByUrl('/signUp');
  }

  ngOnInit(): void {
    this.accountExamination();
    this.examinationService.logOut();
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
      this.examinationService.signIn(this.loginData).then((res: boolean) => {
      }).catch((res:boolean)=>{
        this.loading = res;
      });
    }
  }
}

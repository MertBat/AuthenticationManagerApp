import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  signUpData:any;
  loading = false

  constructor(private formBuilder: FormBuilder, private examinationService:ExaminationService, private router:Router) {}

  ngOnInit() {
    this.signUpExamination();
  }

  toLogin(){
    this.router.navigateByUrl("/login");
  }

  signUpExamination() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  runSignUp() {
    if(this.signUpForm.valid){
      this.loading = true
      this.signUpData =Object.assign({}, this.signUpForm.value);
      this.examinationService.signUp(this.signUpData)
    }
  }
}

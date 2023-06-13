import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/login/account';
import { AccountService } from 'src/app/services/account.service';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  uInformationForm!: FormGroup;
  Information: any;
  PasswordChangeForm!: FormGroup;
  passwords: any;
  userInfo: any;
  selectedItem!: string;
  accounts!: Account[];
  administratorCheck!: boolean;
  profileFoto?: string;
  name?: string;
  surname?: string;
  eMail?: string;
  cardReady = false

  constructor(
    private formBuilder: FormBuilder,
    private examinationService: ExaminationService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    
    this.PasswordChangeFormExamination();
    this.accountService.getAccounts().subscribe((data) => {});
    this.accountService.avalibleAccount().subscribe((res) => {
      this.profileFoto = res.url;
      this.name = res.name;
      this.surname = res.surname;
      this.eMail = res.eMail;
      this.uInformationformExamination();
      this.cardReady = true
    });
  }

  uInformationformExamination() {
    this.uInformationForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      surname: [this.surname, Validators.required],
      eMail: [this.eMail, Validators.required],
      profileFoto: [this.profileFoto, Validators.required],
    });
  }
  PasswordChangeFormExamination() {
    this.PasswordChangeForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword1: ['', Validators.required],
      newPassword2: ['', Validators.required],
    });
  }

  changeInformation() {
    if (this.uInformationForm.valid) {
      this.userInfo = Object.assign({}, this.uInformationForm.value);
      this.accountService.avalibleAccount().subscribe(data=>{
        this.examinationService.userInfoChange(this.userInfo, data.id);
      })
      
    }
  }
  changePassword() {
    if (this.PasswordChangeForm.valid) {
      this.passwords = Object.assign({}, this.PasswordChangeForm.value);
      this.examinationService.passwordChange(this.passwords);
    }
  }
}

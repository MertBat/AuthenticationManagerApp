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
  userInfo:any
  selectedItem!: string;
  accounts!: Account[];
  administratorCheck!: boolean;
  profileFoto = this.accountService.avalibleAccount().url
  userName = this.accountService.avalibleAccount().userName;
  userSurname = this.accountService.avalibleAccount().userSurname
  eMail = this.accountService.avalibleAccount().eMail

  constructor(
    private formBuilder: FormBuilder,
    private examinationService: ExaminationService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.uInformationformExamination();
    this.PasswordChangeFormExamination();
    // this.accountService.getAccounts(this.accountService.avalibleAccount()!).subscribe((data) => {
    //   if (data[0].authority == 'admin' ) {
    //     this.administratorCheck = true;
    //   } else {
    //     this.administratorCheck = false;
    //   }
    // });
    this.accountService.getAccounts().subscribe((data) => {
    });
  }

  uInformationformExamination() {

    this.uInformationForm = this.formBuilder.group({
      userName: [this.userName, Validators.required],
      usersurname: [this.userSurname, Validators.required],
      eMail: [this.eMail, Validators.required],
      profileFoto: [this.profileFoto, Validators.required]
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
      this.examinationService.userInfoChange(this.userInfo, this.accountService.avalibleAccount().name);
    }
  }
  changePassword() {
    if (this.PasswordChangeForm.valid) {
      this.passwords = Object.assign({}, this.PasswordChangeForm.value);
      this.examinationService.passwordChange(this.passwords);
    }
  }
}

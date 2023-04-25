
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/login/account';
import { AccountService } from 'src/app/services/account.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { Role, UserTable } from '../userTable';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  accountName!: string;
  tableReady = false;
  uInformationForm!: FormGroup
  Information: any;
  PasswordChangeForm!: FormGroup;
  passwords: any;
  userInfo: any
  selectedItem!: string;
  account = new UserTable();
  administratorCheck!: boolean;
  roles: any[] = []
  roleProperties!: any;
  selectedProperties!: any
  selectedRole!: string
  addProduct!: boolean;
  changeProduct!: boolean;
  removeProduct!: boolean;
  userAdd!: boolean;
  userChange!: boolean;
  userDelete!: boolean;
  roleButtonCondition = true

  constructor(
    private formBuilder: FormBuilder,
    private examinationService: ExaminationService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.accountName = params['username'];
    });
    this.accountService.getAccounts(this.accountName).subscribe((data) => {
      this.account.accountName = data[0].name;
      this.account.eMail = data[0].eMail;
      this.account.userName = data[0].userName;
      this.account.userSurname = data[0].userSurname;
      this.account.profileFoto = data[0].url;
      this.account.password = data[0].password;
      this.selectedRole = data[0].authority;
      this.uInformationformExamination()
      this.tableReady = true
    });
    this.roleService.getRoles().subscribe(data => {
      if (Array.isArray(data)) {
        this.roles = data.map((r: Role) => {
          return r.role;
        });
        this.roleProperties = data.filter((d: Role) => {
          return Object.values(d).includes(true);
        });
        console.log(this.roleProperties);
      }
      this.permisions()
    });

  }

  newRoleSelected() {
    this.roleButtonCondition= false
  }

  permisions() {
    this.selectedProperties = this.roleProperties.filter((d: any) => {
      return Object.values(d).includes(this.selectedRole)
    });
    this.addProduct = this.selectedProperties[0].addProduct;
    this.changeProduct = this.selectedProperties[0].changeProduct;
    this.removeProduct = this.selectedProperties[0].removeProduct;
    this.userAdd = this.selectedProperties[0].userAdd;
    this.userChange = this.selectedProperties[0].userChange;
    this.userDelete = this.selectedProperties[0].userDelete;
  }

  uInformationformExamination() {
    this.uInformationForm = this.formBuilder.group({
      userName: [this.account.userName],
      userSurname: [this.account.userSurname],
      eMail: [this.account.eMail, Validators.email],
      profileFoto: [this.account.profileFoto],
      password: [this.account.password, Validators.required],
    });

  }

  changeInformation() {
    if (this.uInformationForm.valid) {
      this.userInfo = Object.assign({}, this.uInformationForm.value);
      this.examinationService.userInfoChange(this.userInfo, this.account.accountName);
    }
  }

  ChangeRole() {
    this.examinationService.authorityChange(this.selectedRole, this.account.accountName);
  }

  accountAuthority(){
    if(this.accountService.avalibleAccount().authority == "admin"){
      return true;
    }else{
      return false;
    }
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { Role, User } from '../userTable';
import { RoleService } from 'src/app/services/role.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  accountId!: number;
  tableReady = false;
  uInformationForm!: FormGroup;
  PasswordChangeForm!: FormGroup;
  userInfo: any;
  selectedItem!: string;
  account = new User();
  roles: any;
  permissions: any;
  roleProperties!: any;
  selectedProperties!: any;
  selectedRole!: string;
  roleButtonCondition = true;
  accountAccess!:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private examinationService: ExaminationService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.accountId = parseInt(params['id']);
    });
    this.accountService.getAccounts(this.accountId).subscribe((data) => {
      this.account = data;
      this.selectedRole = this.account.authority;
      this.uInformationformExamination();
      this.roleService.getRoles().subscribe((data: any) => {
        this.permissions = data.filter((d: Role) => {
          return d.roleName == this.account.authority;
        })[0].permissions;
        this.roles = data.map((d: Role) => {
          return d.roleName;
        });
        this.tableReady = true;
      });
    });
    this.accountAuthority()
    
  }

  permission() {
    this.selectedProperties = this.roleProperties.filter((d: any) => {
      return Object.values(d).includes(this.selectedRole);
    });
  }

  selectboxValueChange() {
    this.roleService.getRoles().subscribe((data: any) => {
      this.permissions = data.filter((d: Role) => {
        return d.roleName == this.selectedRole;
      })[0].permissions;
    });
    this.permissions = [...this.permissions];
    this.roleButtonCondition = false;
  }

  uInformationformExamination() {
    this.uInformationForm = this.formBuilder.group({
      name: [this.account.name],
      surname: [this.account.surname],
      eMail: [this.account.eMail, Validators.email],
      profileFoto: [this.account.url],
      password: [this.account.password, Validators.required],
    });
  }

  changeInformation() {
    if (this.uInformationForm.valid) {
      this.userInfo = Object.assign({}, this.uInformationForm.value);
      this.examinationService.userInfoChange(this.userInfo, this.accountId);
    }
  }

  ChangeRole() {
    this.examinationService.authorityChange(this.selectedRole, this.accountId);
  }

  accountAuthority() {
    this.accountService.avalibleAccount().subscribe((data) => {
      if (data.authority == 'admin') {
        this.accountAccess =  true;
      } else {
        this.accountAccess= false;
      }
    });
  }
}

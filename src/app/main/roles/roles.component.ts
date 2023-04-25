import { Component, Inject, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Role } from '../users/userTable';
import { AccountService } from 'src/app/services/account.service';
import { AletifyService } from 'src/app/services/aletify.service';

@Component({
  selector: 'app-properties',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: any;
  taskBlocker!:Role

  constructor(
    private roleService: RoleService,
    public matDialog: MatDialog,
    private accountService:AccountService
  ) { }

  ngOnInit() {
    this.refresh();
    this.taskBlocker = this.accountService.getAccountPermissions()[0]
  }

  refresh() {
    this.roleService.getRoles().subscribe(data => {
      this.roles = data;
    })
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(this.roles[id].id).subscribe(()=>{
      this.refresh();
    });
  }
  saveRole(id: number) {
    this.roleService.putRoles(this.roles[id],this.roles[id].id).subscribe(()=>{
    })
  }

  roleName(): Observable<string> {
    const dialogRef = this.matDialog.open(AddRoleComponent, {
      data: name
    });
    return dialogRef.afterClosed();
  }

  addRole() {
    this.roleName().subscribe(data => {
      if (data) {
        const newRole: Role = {
          id: 0,
          role: data,
          addProduct: false,
          changeProduct: false,
          removeProduct: false,
          userAdd: false,
          userChange: false,
          userDelete: false,
          roleAdd: false,
	        roleChange: false,
	        roleDelete: false
        };
        this.roles = [newRole, ...this.roles]
        this.roleService.postRole(newRole).subscribe(() => { this.refresh(); })
      }
    })
  }
}

@Component({
  selector: 'dialog-addRole',
  templateUrl: './addRole.component.html',
})
export class AddRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

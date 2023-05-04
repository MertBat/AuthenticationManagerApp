import { Component, Inject, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Permission, Role } from '../users/userTable';
import { AccountService } from 'src/app/services/account.service';
import { AletifyService } from 'src/app/services/aletify.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-properties',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles!: any;
  permissions!: any
  PermissionCheck!: any
  addRolePermission!: boolean
  deleteRolePermission!: boolean
  editRolePermission!: boolean


  constructor(
    private roleService: RoleService,
    public matDialog: MatDialog,
    private accountService: AccountService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.permissionService.getPermissions().subscribe(data => {
      this.permissions = data
    })
    const accountPermissions = this.accountService.getAccountPermissions()[0].permissions
    this.addRolePermission = accountPermissions.some((p: any) => p == "roleAdd");
    this.editRolePermission = accountPermissions.some((p: any) => p == "roleChange");
    this.deleteRolePermission = accountPermissions.some((p: any) => p == "roleDelete");
    this.refresh();
  }

  includesEqual(array: string[], value: string) {
    return array.some((p: any) => p == value)
  }

  checkCondition(e: any) {
    const clickedProperties = document.getElementById(e.source.id)?.firstChild?.lastChild?.lastChild?.nodeValue;
    const clickedRole = document.getElementById(e.source.id)?.parentElement?.parentElement?.parentElement?.querySelectorAll("h6")[0].innerHTML;
    const roleArray = this.roles.filter((d: any) => d.role == clickedRole?.trim())
    if (e.checked) {
      roleArray[0].permissions.push(clickedProperties?.trim());
    } else {
      const index = roleArray[0].permissions.indexOf(clickedProperties?.trim())
      roleArray[0].permissions.splice(index, 1)
    }
    this.roles.forEach((element: any) => {
      if (element.role == clickedRole?.trim()) {
        return element = roleArray;
      }
    });

  }

  refresh() {
    this.roleService.getRoles().subscribe((data:any) => {
      this.roles = data.filter((d:any)=> d.role !== "admin" && d.role !== "user");
    })
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.refresh();
    });
  }
  saveRole(id: number) {
    const selectedPermisions = this.roles.filter((d:any)=> d.id == id);
    this.roleService.putRoles(selectedPermisions[0], id).subscribe(() => {
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
          roleName: data,
          permissions: []
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

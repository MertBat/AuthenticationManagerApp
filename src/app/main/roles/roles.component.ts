import { Component, Inject, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Role } from '../users/userTable';
import { AccountService } from 'src/app/services/account.service';
import { PermissionService } from 'src/app/services/permission.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ExaminationService } from 'src/app/services/examination.service';

declare let alertify: any;

@Component({
  selector: 'app-properties',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  roles!: any;
  permissions!: any;
  PermissionCheck!: any;
  addRolePermission!: boolean;
  deleteRolePermission!: boolean;
  editRolePermission!: boolean;

  constructor(
    private roleService: RoleService,
    public matDialog: MatDialog,
    private examinationService: ExaminationService,
    private permissionService: PermissionService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.permissionService.getPermissions().subscribe((data) => {
      this.permissions = data;
    });
    this.examinationService.getAccountPermissions().subscribe((permis) => {
      this.addRolePermission = permis.some(
        (p: any) => p == 'roleAdd'
      );
      this.editRolePermission = permis.some(
        (p: any) => p == 'roleChange'
      );
      this.deleteRolePermission = permis.some(
        (p: any) => p == 'roleDelete'
      );
    });
    this.refresh();
  }

  includesPermission(array: string[], value: string) {
    return array.some((p: any) => p == value);
  }

  checkCondition(e: any) {
    const clickedPermission = document.getElementById(e.source.id)?.firstChild
      ?.lastChild?.lastChild?.nodeValue;
    const clickedRole = document
      .getElementById(e.source.id)
      ?.parentElement?.parentElement?.parentElement?.querySelectorAll(
        'h6'
      )[0].innerHTML;
    const roleArray = this.roles.filter(
      (d: Role) => d.roleName == clickedRole?.trim()
    );

    if (e.checked) {
      roleArray[0].permissions.push(clickedPermission?.trim());
    } else {
      const index = roleArray[0].permissions.indexOf(clickedPermission?.trim());
      roleArray[0].permissions.splice(index, 1);
    }
    this.roles.forEach((element: any) => {
      if (element.role == clickedRole?.trim()) {
        return (element = roleArray);
      }
    });
  }

  refresh() {
    this.roleService.getRoles().subscribe((data: any) => {
      this.roles = data.filter(
        (d: any) => d.role !== 'admin' && d.role !== 'user'
      );
    });
  }

  deleteRole(id: number) {
    alertify.confirm(
      'DELETE!!!',
      'Are you sure you want to delete this role?',
      () => {
        this.roleService.deleteRole(id).subscribe(() => {
          this.refresh();
          this.alertifyService.success('Role successfuly deleted');
        });
      },
      () => {}
    );
  }
  saveRole(id: number) {
    const selectedPermisions = this.roles.filter((d: any) => d.id == id);
    this.roleService.putRoles(selectedPermisions[0], id).subscribe(
      () => {
        this.alertifyService.success('Successfuly saved');
      },
      (e) => {
        this.alertifyService.error(e);
      }
    );
  }

  roleName(): Observable<string> {
    const dialogRef = this.matDialog.open(AddRoleComponent, {
      data: name,
    });
    return dialogRef.afterClosed();
  }

  addRole() {
    this.roleName().subscribe((data) => {
      if (data) {
        const newRole: Role = {
          id: 0,
          roleName: data,
          permissions: [],
        };
        this.roles = [newRole, ...this.roles];
        this.roleService.postRole(newRole).subscribe(() => {
          this.refresh();
        });
      }
    });
  }
}

@Component({
  selector: 'dialog-addRole',
  templateUrl: './addRole.component.html',
})
export class AddRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

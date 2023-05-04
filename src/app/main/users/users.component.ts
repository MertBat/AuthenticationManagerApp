import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ColumnsSchema, Role, User } from './userTable';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { RoleService } from 'src/app/services/role.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { AletifyService } from 'src/app/services/aletify.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ColumnsSchema.map((col) => col.key);
  columnsSchema: any = ColumnsSchema;
  datas: User[] = [];
  dataSource: any;
  @ViewChild(MatTable) table!: MatTable<RoleService>;
  roles: any[] = [];
  confirmPassword!: boolean;
  validation: any = {};
  selectedAccountName!: string;
  addUserPermission!: boolean;
  deleteUserPermission!: boolean;
  editUserPermission!: boolean;

  constructor(
    private accountService: AccountService,
    public matDialog: MatDialog,
    private roleService: RoleService,
    private examinationService: ExaminationService,
    private alertifyService: AletifyService,
    private router: Router
  ) {}
  ngOnInit() {
    this.refresh();
    this.roleService.getRoles().subscribe((data) => {
      if (Array.isArray(data)) {
        this.roles = data.map((d: Role) => {
          return d.roleName;
        });
      }
    });
    const accountPermissions =
      this.accountService.getAccountPermissions()[0].permissions;
    this.addUserPermission = accountPermissions.some(
      (p: any) => p == 'userAdd'
    );
    this.deleteUserPermission = accountPermissions.some(
      (p: any) => p == 'userDelete'
    );
    this.editUserPermission = accountPermissions.some(
      (p: any) => p == 'userChange'
    );
  }
  refresh() {
    this.accountService.getAccounts().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.datas = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmPopup() {
    const matDialog = this.matDialog.open(ConfirmComponent, {
      width: '300px',
      data: this.confirmPassword,
    });
  }

  editRow(row: User) {
    this.router.navigate(['/main/controlPanel/users/edit'], {
      queryParams: { id: row.id, username: row.userName },
    });
  }

  newRow(row: User) {
    this.accountService.getAccounts().subscribe((data) => {
      if (
        row.id == 0 &&
        !data.some((user: any) => user.name.includes(row.userName)) &&
        row.password !== ''
      ) {
        row.isEdit = false;
        delete row.isEdit;
        row.url = '';
        this.accountService.postAccount(row).subscribe(() => {
          row.isEdit = false;
        });
      } else if (row.password == '') {
        this.alertifyService.alert('Failure', 'please type password');
      } else {
        this.alertifyService.alert(
          'Failure',
          `Account name "${row.userName}" is already used in`
        );
      }
    });
  }

  addRow() {
    const newUser: User = {
      id: 0,
      userName: '',
      name: '',
      surname: '',
      password: '',
      eMail: '',
      authority: 'user',
      isEdit: true,
    };
    this.datas = [newUser, ...this.datas];
    this.dataSource = new MatTableDataSource(this.datas);
  }

  deleteRow(row: User) {
    this.confirmation('delete').subscribe((result) => {
      if (result) {
        this.accountService.deleteAccount(row.id!).subscribe(() => {
          this.datas = this.datas.filter((m: any) => m.id !== row.id);
          this.refresh();
          this.alertifyService.success('User successfuly deleted');
        });
      }
    });
  }

  confirmation(name: string): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      data: name,
    });
    return dialogRef.afterClosed();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ColumnsSchema, Role, UserTable } from './userTable';
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
  datas: UserTable[] = [];
  dataSource: any;
  @ViewChild(MatTable) table!: MatTable<RoleService>;
  roles: any[] = [];
  confirmPassword!: boolean;
  validation: any = {}
  selectedAccountName!: string

  constructor(
    private accountService: AccountService,
    public matDialog: MatDialog,
    private roleService: RoleService,
    private examinationService: ExaminationService,
    private alertifyService: AletifyService,
    private router:Router
  ) { }
  ngOnInit() {
    this.refresh();
    this.roleService.getRoles().subscribe((data) => {
      if (Array.isArray(data)) {
        this.roles = data.map((d: Role) => {
          return d.role;
        });
      }
    });
  }
  refresh() {
    this.accountService.getAccounts().subscribe((data) => {
      this.datas = data.map((d: any) => {
        let userTable = new UserTable();
        userTable.accountName = d.name;
        userTable.userName = d.userName;
        userTable.userSurname = d.userSurname;
        userTable.password = d.password;
        userTable.role = d.authority;
        userTable.eMail = d.eMail;
        return userTable;
      });
      this.dataSource = new MatTableDataSource(this.datas);
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

  editRow(row: UserTable) {
    this.router.navigate(['/main/controlPanel/users/edit'], { queryParams: { username: row.accountName } });
  }

  editedRow(row: UserTable) {
    this.accountService.getAccounts().subscribe(data => {
      if (row.id == 0 && !data.some((user: any) => user.name.includes(row.accountName))) {
        this.examinationService.addUser(row).subscribe(() => {
          row.isEdit = false;
        })
      } else {
        this.alertifyService.alert("Failure", `Account name "${row.accountName}" is already used in`)
      }
    });
  }

  addRow() {
    const newUser: UserTable = {
      id: 0,
      accountName: "",
      userName: "",
      userSurname: "",
      password: "",
      eMail: "",
      role: "user",
      isEdit: true
    };
    this.datas = [newUser, ...this.datas];
    this.dataSource = new MatTableDataSource(this.datas);
  }

  deleteRow(row: UserTable) {
    this.confirmation("delete").subscribe(result => {
      if (result) {
        debugger;
        this.examinationService.deleteUser(row).subscribe(() => {
          this.datas = this.datas.filter((m: any) => m.accountName !== row.accountName)
          this.refresh();
        });
      }
    });
  }

  inputControl(e: any, key: string, id: number) {
    if (!this.validation[id]) {
      this.validation[id] = {};
    }
    this.validation[id][key] = e.target.validity.valid
  }

  validationControl(id: number) {
    if (this.validation[id]) {
      return Object.values(this.validation[id]).some(item => item == false)
    }
    return false
  }

  confirmation(name: string): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      data: name
    });
    return dialogRef.afterClosed();
  }
}

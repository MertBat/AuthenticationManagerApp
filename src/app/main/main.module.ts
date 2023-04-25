import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbTabsetModule, NbThemeModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoleComponent, RolesComponent } from './roles/roles.component';

import { MaterialModule } from './material.module';
import { ConfirmComponent } from './users/confirm/confirm.component';
import { RoleService } from '../services/role.service';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';
import { BookComponent } from './products/book/book.component';
import { ShoeComponent } from './products/shoe/shoe.component';
import { PhoneComponent } from './products/phone/phone.component';
import { MouseComponent } from './products/mouse/mouse.component';
import { ProductSettingsComponent } from './products/product-settings/product-settings.component';
import { AddChangeDialogComponent } from './products/product-settings/add-change-dialog/add-change-dialog.component';



@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    HomeComponent,
    UsersComponent,
    RolesComponent,
    ConfirmComponent,
    UserEditComponent,
    AddRoleComponent,
    BookComponent,
    ShoeComponent,
    PhoneComponent,
    MouseComponent,
    ProductSettingsComponent,
    AddChangeDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbLayoutModule,
    NbUserModule,
    NbSidebarModule.forRoot(),
    NbCardModule,
    NbTabsetModule,
    NbSelectModule,
    NbButtonModule,
    MaterialModule

  ],
providers: [RoleService]
})
export class MainModule { }

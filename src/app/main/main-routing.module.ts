import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';
import { ControlpanelGuardService } from '../services/controlpanel-guard.service';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { BookComponent } from './products/book/book.component';
import { PhoneComponent } from './products/phone/phone.component';
import { ShoeComponent } from './products/shoe/shoe.component';
import { MouseComponent } from './products/mouse/mouse.component';
import { ProductSettingsComponent } from './products/product-settings/product-settings.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },  
      { path: 'book', component: BookComponent },
      { path: 'phone', component: PhoneComponent },
      { path: 'shoe', component: ShoeComponent },
      { path: 'mouse', component: MouseComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product-settings', component: ProductSettingsComponent, canActivate:[ControlpanelGuardService] },
      {
        path: 'controlPanel', canActivate:[ControlpanelGuardService], children: [
          { path: 'users', component: UsersComponent },
          { path: 'users/edit', component: UserEditComponent },
          { path: 'roles', component: RolesComponent }
        ]
      }
    ]
  },
  { path: "logout", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
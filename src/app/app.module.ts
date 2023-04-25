import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginGuardService } from './services/login-guard.service';
import { AletifyService } from './services/aletify.service';
import { AccountService } from './services/account.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExaminationService } from './services/examination.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ControlpanelGuardService } from './services/controlpanel-guard.service';
import { ProductListService } from './services/product-list.service';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SplashScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    LoginGuardService,
    AletifyService,
    AccountService,
    ExaminationService,
    ControlpanelGuardService,
    ProductListService,
    CategoryService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

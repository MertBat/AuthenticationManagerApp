import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{
  operation!:string;
  confirmForm!:FormGroup
  loading= false


  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private formBuilder:FormBuilder,
    private accountService:AccountService
    ) {}

  ngOnInit() {
    this.validationForm();
  }

  validationForm(){
    this.confirmForm = this.formBuilder.group({ 
      password:["", Validators.required ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirm(){
    this.accountService.avalibleAccount().subscribe((data) => {
      if (data.password == this.confirmForm.value.password) {
        this.dialogRef.close(true)
      } else {
        this.dialogRef.close(false)
      }
    });
    
  }
  
}

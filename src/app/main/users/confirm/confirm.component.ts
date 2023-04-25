import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private examinationService:ExaminationService
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
    this.dialogRef.close(this.examinationService.passwordCheck(this.confirmForm.value.password)); 
  }
  
}

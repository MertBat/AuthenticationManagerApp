import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChangeDialogComponent } from './add-change-dialog.component';

describe('AddChangeDialogComponent', () => {
  let component: AddChangeDialogComponent;
  let fixture: ComponentFixture<AddChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChangeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

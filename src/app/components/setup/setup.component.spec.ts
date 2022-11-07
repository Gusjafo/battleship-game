import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SetupComponent } from './setup.component';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonToggleModule,
        MatSnackBarModule
      ],
      declarations: [SetupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprofileComponent } from './allprofile.component';

describe('AllprofileComponent', () => {
  let component: AllprofileComponent;
  let fixture: ComponentFixture<AllprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllprofileComponent]
    });
    fixture = TestBed.createComponent(AllprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

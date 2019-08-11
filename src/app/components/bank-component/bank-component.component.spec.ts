import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankComponentComponent } from './bank-component.component';

describe('BankComponentComponent', () => {
  let component: BankComponentComponent;
  let fixture: ComponentFixture<BankComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

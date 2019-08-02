import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGetterComponent } from './location-getter.component';

describe('LocationGetterComponent', () => {
  let component: LocationGetterComponent;
  let fixture: ComponentFixture<LocationGetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationGetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationGetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

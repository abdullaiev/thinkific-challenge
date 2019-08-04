import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentComponent } from 'src/app/components/no-content/no-content.component';

describe('NoContentComponent', () => {
  let component: NoContentComponent;
  let fixture: ComponentFixture<NoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

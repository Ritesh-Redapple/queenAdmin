import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlhTableComponent } from './nlh-tables.component';

describe('NlhTableComponent', () => {
  let component: NlhTableComponent;
  let fixture: ComponentFixture<NlhTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NlhTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlhTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

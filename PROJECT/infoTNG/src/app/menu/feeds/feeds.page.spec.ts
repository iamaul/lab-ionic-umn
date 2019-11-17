import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsPage } from './feeds.page';

describe('FeedsPage', () => {
  let component: FeedsPage;
  let fixture: ComponentFixture<FeedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

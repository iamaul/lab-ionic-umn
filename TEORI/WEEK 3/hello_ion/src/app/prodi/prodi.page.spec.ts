import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdiPage } from './prodi.page';

describe('ProdiPage', () => {
  let component: ProdiPage;
  let fixture: ComponentFixture<ProdiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

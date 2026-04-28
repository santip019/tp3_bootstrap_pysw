import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agencias } from './agencias';

describe('Agencias', () => {
  let component: Agencias;
  let fixture: ComponentFixture<Agencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agencias],
    }).compileComponents();

    fixture = TestBed.createComponent(Agencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

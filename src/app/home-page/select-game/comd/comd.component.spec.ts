import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComdComponent } from './comd.component';

describe('ComdComponent', () => {
  let component: ComdComponent;
  let fixture: ComponentFixture<ComdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

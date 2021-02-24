import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComdResultsComponent } from './comd-results.component';

describe('ComdResultsComponent', () => {
  let component: ComdResultsComponent;
  let fixture: ComponentFixture<ComdResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComdResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComdResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

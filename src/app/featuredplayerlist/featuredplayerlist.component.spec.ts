import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedplayerlistComponent } from './featuredplayerlist.component';

describe('FeaturedplayerlistComponent', () => {
  let component: FeaturedplayerlistComponent;
  let fixture: ComponentFixture<FeaturedplayerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedplayerlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedplayerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

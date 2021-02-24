import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPlayersComponent } from './featured-players.component';

describe('FeaturedPlayersComponent', () => {
  let component: FeaturedPlayersComponent;
  let fixture: ComponentFixture<FeaturedPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

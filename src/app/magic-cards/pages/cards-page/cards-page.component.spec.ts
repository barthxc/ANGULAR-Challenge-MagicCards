import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPageComponent } from './cards-page.component';

describe('CardsPageComponent', () => {
  let component: CardsPageComponent;
  let fixture: ComponentFixture<CardsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsPageComponent]
    });
    fixture = TestBed.createComponent(CardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

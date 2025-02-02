import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsByIdPageComponent } from './cards-by-id-page.component';

describe('CardsByIdPageComponent', () => {
  let component: CardsByIdPageComponent;
  let fixture: ComponentFixture<CardsByIdPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsByIdPageComponent]
    });
    fixture = TestBed.createComponent(CardsByIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicsCardsLayoutComponent } from './magics-cards-layout.component';

describe('MagicsCardsLayoutComponent', () => {
  let component: MagicsCardsLayoutComponent;
  let fixture: ComponentFixture<MagicsCardsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagicsCardsLayoutComponent]
    });
    fixture = TestBed.createComponent(MagicsCardsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

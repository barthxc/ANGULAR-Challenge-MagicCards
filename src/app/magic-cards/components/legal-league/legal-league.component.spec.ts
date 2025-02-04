import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalLeagueComponent } from './legal-league.component';

describe('LegalLeagueComponent', () => {
  let component: LegalLeagueComponent;
  let fixture: ComponentFixture<LegalLeagueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalLeagueComponent]
    });
    fixture = TestBed.createComponent(LegalLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

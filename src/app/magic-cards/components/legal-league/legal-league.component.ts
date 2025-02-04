import { Component, Input } from '@angular/core';
import { LegalityElement } from '../../interfaces/CardsResponse.internface';

@Component({
  selector: 'legal-formats',
  templateUrl: './legal-league.component.html',
  styleUrls: ['./legal-league.component.css'],
})
export class LegalLeagueComponent {
  @Input() legalities!: LegalityElement[];
}

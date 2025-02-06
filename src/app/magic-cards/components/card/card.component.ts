import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/CardsResponse.internface';
import { CardAndLanguage, CardById } from '../../interfaces/CardById.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() isOnlyCard: boolean = false;

  @Input() arrayCards!: Card;

  @Input() cardById!: CardAndLanguage;
}

import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/CardsResponse.internface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() isOnlyCard: boolean = false;

  @Input() card!: Card;
}

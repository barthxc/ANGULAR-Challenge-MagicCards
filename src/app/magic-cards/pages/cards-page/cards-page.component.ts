import { Card } from './../../interfaces/CardsResponse.internface';
import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.css'],
})
export class CardsPageComponent implements OnInit {
  constructor(
    private cardsService: CardsService,
    private loadingService: LoadingService
  ) {}

  public cards: Card[] = [];
  public totalCount!: string | null;
  public isLoading: boolean = false;
  public needApi!: boolean;
  public backupCards: Card[] = [];

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(({ cards, totalCount }) => {
      this.cards = cards;
      this.backupCards = cards;
      this.totalCount = totalCount;
    });

    this.loadingService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.cardsService.needApi$.subscribe((needApi) => {
      this.needApi = needApi;
    });
  }
}

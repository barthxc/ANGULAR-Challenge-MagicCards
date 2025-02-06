import { Card } from './../../interfaces/CardsResponse.internface';
import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { LoadingService } from '../../services/loading.service';
import { Filter } from '../../interfaces/Filter.interface';

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
  public needApi: boolean = false;
  public backupCards: Card[] = [];
  public page: number = 1;

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

  filterCards(filterData: Filter) {
    this.cardsService.filterCards(filterData).subscribe((filteredCards) => {
      this.cards = filteredCards;
    });
  }

  resetData() {
    this.cards = this.backupCards;
  }

  searchData(filterData: Filter) {
    this.cardsService
      .getCards(filterData, true)
      .subscribe(({ cards, totalCount }) => {
        this.cards = cards;
        this.totalCount = totalCount;
      });
  }

  evaluatePagination(value: 'prev' | 'next') {
    const pageValue = value === 'prev' ? -1 : 1;

    const newPage = Math.max(1, this.page + pageValue);

    this.cardsService
      .getCards(undefined, undefined, undefined, newPage)
      .subscribe(({ cards, totalCount }) => {
        this.cards = cards;
        this.backupCards = cards;
        this.totalCount = totalCount;
        this.page = newPage;
      });
  }
}
